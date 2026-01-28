<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all()->map(function ($product) {
            return [
                'id'           => $product->id,
                'name'         => $product->name,
                'price'        => $product->price,
                'description'  => $product->description,
                'subscription' => $product->subscription,
                'image1'       => $product->image1,
                'image1_url'   => $product->image1 ? Storage::url($product->image1) : null,
                'image2'       => $product->image2,
                'image2_url'   => $product->image2 ? Storage::url($product->image2) : null,
                'image3'       => $product->image3,
                'image3_url'   => $product->image3 ? Storage::url($product->image3) : null,
                'image4'       => $product->image4,
                'image4_url'   => $product->image4 ? Storage::url($product->image4) : null,
                'image5'       => $product->image5,
                'image5_url'   => $product->image5 ? Storage::url($product->image5) : null,
                'image6'       => $product->image6,
                'image6_url'   => $product->image6 ? Storage::url($product->image6) : null,
            ];
        });

        return Inertia::render('Products/Index', ['products' => $products]);
    }

    public function create()
    {
        return Inertia::render('Products/Create', [
            'authUser' => auth()->user()
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
            'name'         => 'required|string|max:255',
            'image1'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image2'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image3'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image4'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image5'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image6'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'subscription' => 'boolean',
        ];

        if (auth()->user()->user_type !== 'user') {
            $rules['price']       = 'required|numeric';
            $rules['description'] = 'nullable|string';
        }

        $validated = $request->validate($rules);

        if (auth()->user()->user_type === 'user') {
            $validated['price']       = 0;
            $validated['description'] = 'N/A';
            $validated['subscription'] = false;
        }

        // Handle multiple image uploads
        foreach (['image1', 'image2', 'image3', 'image4', 'image5', 'image6'] as $key) {
            if ($request->hasFile($key)) {
                $validated[$key] = $request->file($key)->store('products', 'public');
            }
        }

        Product::create($validated);

        return redirect()->route('products.index')
            ->with('message', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        $productData = [
            'id'           => $product->id,
            'name'         => $product->name,
            'price'        => $product->price,
            'description'  => $product->description,
            'subscription' => $product->subscription,
            'image1'       => $product->image1,
            'image1_url'   => $product->image1 ? Storage::url($product->image1) : null,
            'image2'       => $product->image2,
            'image2_url'   => $product->image2 ? Storage::url($product->image2) : null,
            'image3'       => $product->image3,
            'image3_url'   => $product->image3 ? Storage::url($product->image3) : null,
            'image4'       => $product->image4,
            'image4_url'   => $product->image4 ? Storage::url($product->image4) : null,
            'image5'       => $product->image5,
            'image5_url'   => $product->image5 ? Storage::url($product->image5) : null,
            'image6'       => $product->image6,
            'image6_url'   => $product->image6 ? Storage::url($product->image6) : null,
        ];

        return Inertia::render('Products/Edit', ['product' => $productData]);
    }

    public function update(Request $request, Product $product)
    {
        $rules = [
            'name'         => 'required|string|max:255',
            'image1'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image2'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image3'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image4'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image5'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image6'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'subscription' => 'boolean',

            // Flags for explicit removal
            'remove_image1' => 'boolean',
            'remove_image2' => 'boolean',
            'remove_image3' => 'boolean',
            'remove_image4' => 'boolean',
            'remove_image5' => 'boolean',
            'remove_image6' => 'boolean',
        ];

        if (auth()->user()->user_type !== 'user') {
            $rules['price']       = 'required|numeric';
            $rules['description'] = 'nullable|string';
        }

        $validated = $request->validate($rules);

        if (auth()->user()->user_type === 'user') {
            $validated['price']       = 0;
            $validated['description'] = 'N/A';
            $validated['subscription'] = false;
        }

        // Handle image updates / removals individually
        foreach (['image1', 'image2', 'image3', 'image4', 'image5', 'image6'] as $key) {
            $removeKey = "remove_{$key}";

            if ($request->hasFile($key)) {
                // New file uploaded → replace old one
                if ($product->$key) {
                    Storage::disk('public')->delete($product->$key);
                }
                $validated[$key] = $request->file($key)->store('products', 'public');
            } elseif ($validated[$removeKey] ?? false) {
                // Explicit remove requested
                if ($product->$key) {
                    Storage::disk('public')->delete($product->$key);
                }
                $validated[$key] = null;
            }
            // If neither new file nor remove flag → do NOT touch this field (keeps existing value)
            else {
                unset($validated[$key]); // prevent overwriting with null
            }
        }

        $product->update($validated);

        return redirect()->route('products.index')
            ->with('message', 'Product updated successfully.');
    }

   

    public function destroy(Product $product)
    {
        foreach (['image1', 'image2', 'image3', 'image4', 'image5', 'image6'] as $key) {
            if ($product->$key) {
                Storage::disk('public')->delete($product->$key);
            }
        }

        $product->delete();

        return redirect()->route('products.index')
            ->with('message', 'Product deleted successfully.');
    }
}