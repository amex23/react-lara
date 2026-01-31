<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = Auth::user();

        $rules = [
            'description' => 'nullable|string|max:3000',
            'image1'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image2'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image3'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image4'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image5'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image6'      => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
        ];

        $validated = $request->validate($rules);

        $updates = [];

        if (isset($validated['description'])) {
            $updates['description'] = $validated['description'];
        }

        foreach (['image1', 'image2', 'image3', 'image4', 'image5', 'image6'] as $key) {
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

        return redirect()->back()->with('message', 'Store profile updated successfully.');
    }
}