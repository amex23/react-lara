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
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'description' => $product->description,
                'image1' => $product->image1 ? asset('storage/' . $product->image1) : null,
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
            'name' => 'required|string|max:255',
            'image1' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ];

        if (auth()->user()->user_type !== 'user') {
            $rules['price'] = 'required|numeric';
            $rules['description'] = 'nullable|string';
        }

        $validated = $request->validate($rules);

        // ✅ Add default values for normal user here too
        if (auth()->user()->user_type === 'user') {
            $validated['price'] = 0;
            $validated['description'] = 'N/A';
        }

        if ($request->hasFile('image1')) {
            $validated['image1'] = $request->file('image1')->store('products', 'public');
        }

        Product::create($validated);
        
        return redirect()
            ->route('products.index')
            ->with('message', 'Product created successfully.');
    }

    public function destroy(Product $product)
    {
        // Optional: Delete the image from storage if it exists
        if ($product->image1) {
            Storage::disk('public')->delete($product->image1);
        }

        $product->delete();

        return redirect()
            ->route('products.index')
            ->with('message', 'Product deleted successfully.');
    }

    public function edit(Product $product)
    {
        $productData = [
            'id' => $product->id,
            'name' => $product->name,
            'price' => $product->price,
            'description' => $product->description,
            'image1' => $product->image1,
            'image1_url' => $product->image1 ? asset('storage/' . $product->image1) : null,
        ];
        
        return Inertia::render('Products/Edit', ['product' => $productData]);
    }

    public function update(Request $request, Product $product)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'image1' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ];

        if (auth()->user()->user_type !== 'user') {
            $rules['price'] = 'required|numeric';
            $rules['description'] = 'nullable|string';
        }

        $validated = $request->validate($rules);

        if (auth()->user()->user_type === 'user') {
            $validated['price'] = 0;
            $validated['description'] = 'N/A';
        }

        if ($request->hasFile('image1')) {
            if ($product->image1) {
                Storage::disk('public')->delete($product->image1);
            }
            $validated['image1'] = $request->file('image1')->store('products', 'public');
        }

        $product->update($validated);

        return redirect()
            ->route('products.index')
            ->with('message', 'Product updated successfully.');
    }
}
