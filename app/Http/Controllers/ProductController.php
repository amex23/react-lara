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
                'image1' => $product->image1 ? Storage::url($product->image1) : null,
            ];
        });
        
        return Inertia::render('Products/Index', ['products' => $products]);
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'image1' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image1')) {
            $validated['image1'] = $request->file('image1')->store('products', 'public');
        }

        Product::create($validated);
        
        return redirect()
            ->route('products.index')
            ->with('message', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        $productData = [
            'id' => $product->id,
            'name' => $product->name,
            'price' => $product->price,
            'description' => $product->description,
            'image1' => $product->image1,
            'image1_url' => $product->image1 ? Storage::url($product->image1) : null,
        ];
        
        return Inertia::render('Products/Edit', ['product' => $productData]);
    }

    public function update(Request $request, Product $product)
    {
        // Validate the input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'image1' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image1')) {
            // Delete old image if exists
            if ($product->image1) {
                Storage::disk('public')->delete($product->image1);
            }
            $validated['image1'] = $request->file('image1')->store('products', 'public');
        }

        // Update the product
        $product->update($validated);

        // Redirect back with success message
        return redirect()
            ->route('products.index')
            ->with('message', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        // Delete image if exists
        if ($product->image1) {
            Storage::disk('public')->delete($product->image1);
        }

        $product->delete();
        
        return redirect()
            ->route('products.index')
            ->with('message', 'Product deleted successfully.');
    }
}