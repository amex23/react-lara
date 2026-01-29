<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {
        $query = Product::with('user');

        // Normal users see only their own products
        if (Auth::user()->user_type === 'user') {
            $query->where('user_id', Auth::id());
        }
        // Admins see ALL products

        $products = $query->get()->map(function ($product) {
            $owner = $product->user;

            return [
                'id'           => $product->id,
                'name'         => $product->name,
                'user_id'      => $product->user_id,
                'owner_name'   => $owner?->name ?? 'Unknown',

                // These now correctly come from the user (store owner)
                'price'        => $owner?->price ?? null,
                'description'  => $owner?->description ?? null,
                'subscription' => $owner?->subscription ?? false,
                'image1_url'   => $owner && $owner->image1 ? Storage::url($owner->image1) : null,
                'image2_url'   => $owner && $owner->image2 ? Storage::url($owner->image2) : null,
                'image3_url'   => $owner && $owner->image3 ? Storage::url($owner->image3) : null,
                'image4_url'   => $owner && $owner->image4 ? Storage::url($owner->image4) : null,
                'image5_url'   => $owner && $owner->image5 ? Storage::url($owner->image5) : null,
                'image6_url'   => $owner && $owner->image6 ? Storage::url($owner->image6) : null,
            ];
        });

        return Inertia::render('Products/Index', [
            'products' => $products,
            'authUser' => Auth::user(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create', [
            'authUser' => Auth::user(),
        ]);
    }

    /**
     * Only create product name + owner
     * → Store profile (price/images/etc) should be updated in separate place
     */
    public function store(Request $request)
{
    $user = Auth::user();

    $rules = [
        'name' => 'required|string|max:255',
        'description' => 'nullable|string|max:3000',
        'image1' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
        // ... same image rules as above
    ];

    if ($user->user_type === 'admin') {
        $rules['price'] = 'nullable|numeric|min:0';
        $rules['subscription'] = 'boolean';
    }

    $validated = $request->validate($rules);

    // Create product
    $product = Product::create([
        'name'    => $validated['name'],
        'user_id' => Auth::id(),
    ]);

    // Update user's store profile (same logic as update)
    $storeUpdates = [];
    // ... copy the exact same store update logic from update() above

    if (!empty($storeUpdates)) {
        $user->update($storeUpdates);
    }

    return redirect()->route('products.index')
        ->with('message', 'Product & store created successfully.');
}

    public function edit(Product $product)
    {
        $this->authorizeProduct($product);

        $owner = $product->user;

        return Inertia::render('Products/Edit', [
            'product' => [
                'id'           => $product->id,
                'name'         => $product->name,

                // These come from user (store owner)
                'price'        => $owner?->price,
                'description'  => $owner?->description,
                'subscription' => $owner?->subscription,
                'image1_url'   => $owner?->image1 ? Storage::url($owner->image1) : null,
                'image2_url'   => $owner?->image2 ? Storage::url($owner->image2) : null,
                'image3_url'   => $owner?->image3 ? Storage::url($owner->image3) : null,
                'image4_url'   => $owner?->image4 ? Storage::url($owner->image4) : null,
                'image5_url'   => $owner?->image5 ? Storage::url($owner->image5) : null,
                'image6_url'   => $owner?->image6 ? Storage::url($owner->image6) : null,
            ],
            'authUser' => Auth::user(),
        ]);
    }

    /**
     * Only update product name
     * → Store profile should be updated in separate page
     */
    public function update(Request $request, Product $product)
{
    $this->authorizeProduct($product);

    $user = Auth::user();
    $productOwner = $product->user; // The store owner whose profile we're editing

    // Base validation (everyone)
    $rules = [
        'name' => 'required|string|max:255',
        'description' => 'nullable|string|max:3000',
        'image1' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
        'image2' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
        'image3' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
        'image4' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
        'image5' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
        'image6' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
        'remove_image1' => 'boolean',
        'remove_image2' => 'boolean',
        'remove_image3' => 'boolean',
        'remove_image4' => 'boolean',
        'remove_image5' => 'boolean',
        'remove_image6' => 'boolean',
    ];

    // Admins get price + subscription
    if ($user->user_type === 'admin') {
        $rules['price'] = 'nullable|numeric|min:0';
        $rules['subscription'] = 'boolean';
    }

    $validated = $request->validate($rules);

    // Always update product name
    $product->update(['name' => $validated['name']]);

    // Update store profile (product owner's user record)
    $storeUpdates = [];

    // Description (everyone)
    if (isset($validated['description'])) {
        $storeUpdates['description'] = $validated['description'];
    }

    // Images (everyone)
    foreach (['image1', 'image2', 'image3', 'image4', 'image5', 'image6'] as $key) {
        $removeKey = "remove_{$key}";
        if ($request->hasFile($key)) {
            // Delete old
            if ($productOwner->{$key}) {
                Storage::disk('public')->delete($productOwner->{$key});
            }
            $storeUpdates[$key] = $request->file($key)->store('store-images', 'public');
        } elseif (isset($validated[$removeKey]) && $validated[$removeKey]) {
            // Remove image
            if ($productOwner->{$key}) {
                Storage::disk('public')->delete($productOwner->{$key});
            }
            $storeUpdates[$key] = null;
        }
    }

    // Price + subscription (admins only)
    if ($user->user_type === 'admin') {
        if (isset($validated['price'])) {
            $storeUpdates['price'] = $validated['price'];
        }
        if (isset($validated['subscription'])) {
            $storeUpdates['subscription'] = $validated['subscription'];
        }
    }

    // Save store profile if any changes
    if (!empty($storeUpdates)) {
        $productOwner->update($storeUpdates);
    }

    return redirect()->route('products.index')
        ->with('message', 'Product & store updated successfully.');
}

    public function destroy(Product $product)
    {
        $this->authorizeProduct($product);

        $product->delete();

        return redirect()->route('products.index')
            ->with('message', 'Product deleted successfully.');
    }

    private function authorizeProduct(Product $product): void
    {
        if (Auth::user()->user_type === 'user' && $product->user_id !== Auth::id()) {
            abort(403, 'You do not own this product.');
        }
    }
}