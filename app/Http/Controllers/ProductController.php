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

        if (Auth::user()->user_type === 'user') {
            $query->where('user_id', Auth::id());
        }

        $products = $query->get()->map(function ($product) {
            $owner = $product->user;

            return [
                'id'           => $product->id,
                'name'         => $product->name,
                'user_id'      => $product->user_id,
                'owner_name'   => $owner?->name ?? 'Unknown',

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

    public function store(Request $request)
    {
        $user = Auth::user();

        $rules = [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string|max:3000',
            'image1'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image2'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image3'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image4'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image5'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image6'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
        ];

        $validated = $request->validate($rules);

        // Create product
        Product::create([
            'name'    => $validated['name'],
            'user_id' => $user->id,
        ]);

        // Update user's store profile
        $updates = [];
        if (isset($validated['description'])) {
            $updates['description'] = $validated['description'];
        }

        foreach (['image1','image2','image3','image4','image5','image6'] as $key) {
            if ($request->hasFile($key)) {
                if ($user->$key) {
                    Storage::disk('public')->delete($user->$key);
                }
                $updates[$key] = $request->file($key)->store('store-images', 'public');
            }
        }

        if (!empty($updates)) {
            $user->update($updates);
        }

        return redirect()->route('products.index')
            ->with('message', 'Product created and store profile updated.');
    }

    public function edit(Product $product)
    {
        $this->authorizeProduct($product);

        $owner = $product->user;

        return Inertia::render('Products/Edit', [
            'product' => [
                'id'           => $product->id,
                'name'         => $product->name,
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

    public function update(Request $request, Product $product)
    {
        $this->authorizeProduct($product);

        $owner = $product->user;

        $rules = [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string|max:3000',
            'image1'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image2'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image3'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image4'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image5'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image6'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
        ];

        $validated = $request->validate($rules);

        $product->update(['name' => $validated['name']]);

        $updates = [];
        if (isset($validated['description'])) {
            $updates['description'] = $validated['description'];
        }

        foreach (['image1','image2','image3','image4','image5','image6'] as $key) {
            if ($request->hasFile($key)) {
                if ($owner->$key) {
                    Storage::disk('public')->delete($owner->$key);
                }
                $updates[$key] = $request->file($key)->store('store-images', 'public');
            }
        }

        if (!empty($updates)) {
            $owner->update($updates);
        }

        return redirect()->route('products.index')
            ->with('message', 'Product & store profile updated.');
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