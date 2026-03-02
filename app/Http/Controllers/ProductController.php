<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    // ─────────────────────────────────────────────
    // LIST
    // ─────────────────────────────────────────────
    public function index()
    {
        $authUser = Auth::user();

        if ($authUser->user_type === 'admin') {
            $users = User::all();
        } else {
            $users = User::where('id', $authUser->id)->get();
        }

        $products = $users->map(fn($user) => $this->formatUser($user));

        return Inertia::render('Products/Index', [
            'products'    => $products,
            'authUser'    => $authUser,
            'createUrl'   => $this->actionRoute('create'),
            'editUrlBase' => Auth::user()->user_type === 'admin' ? '/products' : '/dashboard',
        ]);
    }

    // ─────────────────────────────────────────────
    // CREATE FORM
    // ─────────────────────────────────────────────
    public function create()
    {
        $authUser = Auth::user();

        if ($authUser->user_type === 'admin') {
            return redirect()->route('register.admin');
        }

        if ($this->userHasProfile($authUser)) {
            return redirect()->route($this->indexRoute())
                ->with('message', 'You already have a store profile. Use Edit to update it.');
        }

        return Inertia::render('Products/Create', [
            'authUser' => $authUser,
        ]);
    }

    // ─────────────────────────────────────────────
    // STORE
    // ─────────────────────────────────────────────
    public function store(Request $request)
    {
        $authUser = Auth::user();

        if ($authUser->user_type === 'admin') {
            return redirect()->route('register.admin');
        }

        if ($this->userHasProfile($authUser)) {
            return redirect()->route($this->indexRoute())
                ->with('message', 'You already have a store profile.');
        }

        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'description'   => 'nullable|string|max:3000',
            'price'         => 'nullable|numeric|min:0',
            'subscription'  => 'nullable|boolean',
            'image1'        => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image2'        => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image3'        => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image4'        => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image5'        => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image6'        => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'checkout_url1' => 'nullable|url|max:500',
            'checkout_url2' => 'nullable|url|max:500',
            'checkout_url3' => 'nullable|url|max:500',
            'checkout_url4' => 'nullable|url|max:500',
            'checkout_url5' => 'nullable|url|max:500',
            'checkout_url6' => 'nullable|url|max:500',
        ]);

        $updates = [
            'name'          => $validated['name'],
            'description'   => $validated['description'] ?? null,
            'price'         => $validated['price'] ?? null,
            'subscription'  => isset($validated['subscription']) ? (bool) $validated['subscription'] : false,
            'checkout_url1' => $validated['checkout_url1'] ?? null,
            'checkout_url2' => $validated['checkout_url2'] ?? null,
            'checkout_url3' => $validated['checkout_url3'] ?? null,
            'checkout_url4' => $validated['checkout_url4'] ?? null,
            'checkout_url5' => $validated['checkout_url5'] ?? null,
            'checkout_url6' => $validated['checkout_url6'] ?? null,
        ];

        foreach (['image1', 'image2', 'image3', 'image4', 'image5', 'image6'] as $key) {
            if ($request->hasFile($key)) {
                if ($authUser->$key) {
                    Storage::disk('public')->delete($authUser->$key);
                }
                $updates[$key] = $request->file($key)->store('store-images', 'public');
            }
        }

        $authUser->update($updates);

        return redirect()->route($this->indexRoute())
            ->with('message', 'Store profile created successfully.');
    }

    // ─────────────────────────────────────────────
    // EDIT FORM
    // ─────────────────────────────────────────────
    public function edit(User $product)
    {
        $this->authorizeAccess($product);

        return Inertia::render('Products/Edit', [
            'product'    => $this->formatUser($product),
            'targetUser' => [
                'id'        => $product->id,
                'name'      => $product->name,
                'user_type' => $product->user_type,
            ],
            'authUser'   => Auth::user(),
            'indexRoute' => route($this->indexRoute()),
        ]);
    }

    // ─────────────────────────────────────────────
    // UPDATE
    // ─────────────────────────────────────────────
    public function update(Request $request, User $product)
    {
        $this->authorizeAccess($product);

        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'description'   => 'nullable|string|max:3000',
            'price'         => 'nullable|numeric|min:0',
            'subscription'  => 'nullable|boolean',
            'image1'        => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image2'        => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image3'        => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image4'        => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image5'        => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image6'        => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'checkout_url1' => 'nullable|url|max:500',
            'checkout_url2' => 'nullable|url|max:500',
            'checkout_url3' => 'nullable|url|max:500',
            'checkout_url4' => 'nullable|url|max:500',
            'checkout_url5' => 'nullable|url|max:500',
            'checkout_url6' => 'nullable|url|max:500',
        ]);

        $updates = [
            'name'          => $validated['name'],
            'description'   => $validated['description'] ?? null,
            'price'         => $validated['price'] ?? null,
            'subscription'  => isset($validated['subscription']) ? (bool) $validated['subscription'] : false,
            'checkout_url1' => $validated['checkout_url1'] ?? null,
            'checkout_url2' => $validated['checkout_url2'] ?? null,
            'checkout_url3' => $validated['checkout_url3'] ?? null,
            'checkout_url4' => $validated['checkout_url4'] ?? null,
            'checkout_url5' => $validated['checkout_url5'] ?? null,
            'checkout_url6' => $validated['checkout_url6'] ?? null,
        ];

        foreach (['image1', 'image2', 'image3', 'image4', 'image5', 'image6'] as $key) {
            if ($request->hasFile($key)) {
                if ($product->$key) {
                    Storage::disk('public')->delete($product->$key);
                }
                $updates[$key] = $request->file($key)->store('store-images', 'public');
            }
        }

        $product->update($updates);

        return redirect()->route($this->indexRoute())
            ->with('message', 'Store profile updated successfully.');
    }

    // ─────────────────────────────────────────────
    // DELETE
    // ─────────────────────────────────────────────
    public function destroy(User $product)
    {
        $this->authorizeAccess($product);

        foreach (['image1', 'image2', 'image3', 'image4', 'image5', 'image6'] as $key) {
            if ($product->$key) {
                Storage::disk('public')->delete($product->$key);
            }
        }

        $product->update([
            'description'   => null,
            'price'         => null,
            'subscription'  => false,
            'image1'        => null,
            'image2'        => null,
            'image3'        => null,
            'image4'        => null,
            'image5'        => null,
            'image6'        => null,
            'checkout_url1' => null,
            'checkout_url2' => null,
            'checkout_url3' => null,
            'checkout_url4' => null,
            'checkout_url5' => null,
            'checkout_url6' => null,
        ]);

        return redirect()->route($this->indexRoute())
            ->with('message', 'Store profile cleared successfully.');
    }

    // ─────────────────────────────────────────────
    // HELPERS
    // ─────────────────────────────────────────────

    private function indexRoute(): string
    {
        return Auth::user()->user_type === 'admin' ? 'products.index' : 'dashboard';
    }

    private function actionRoute(string $action, mixed $id = null): string
    {
        $isAdmin = Auth::user()->user_type === 'admin';
        $name    = $isAdmin ? "products.{$action}" : "dashboard.{$action}";
        return $id ? route($name, $id) : route($name);
    }

    private function userHasProfile(User $user): bool
    {
        return filled($user->description)
            || filled($user->image1)
            || filled($user->price);
    }

    private function authorizeAccess(User $targetUser): void
    {
        $auth = Auth::user();

        if ($auth->user_type !== 'admin' && $targetUser->id !== $auth->id) {
            abort(403, 'You do not have permission to edit this store profile.');
        }
    }

    private function formatUser(User $user): array
    {
        return [
            'id'                => $user->id,
            'name'              => $user->name,
            'user_id'           => $user->id,
            'owner_name'        => $user->name,
            'description'       => $user->description,
            'price'             => $user->price,
            'subscription'      => (bool) $user->subscription,
            'profile_views'     => (int) ($user->profile_views ?? 0),
            'profile_checkouts' => (int) ($user->profile_checkouts ?? 0),
            'image1_url'        => $user->image1 ? Storage::url($user->image1) : null,
            'image2_url'        => $user->image2 ? Storage::url($user->image2) : null,
            'image3_url'        => $user->image3 ? Storage::url($user->image3) : null,
            'image4_url'        => $user->image4 ? Storage::url($user->image4) : null,
            'image5_url'        => $user->image5 ? Storage::url($user->image5) : null,
            'image6_url'        => $user->image6 ? Storage::url($user->image6) : null,
            'checkout_url1'     => $user->checkout_url1,
            'checkout_url2'     => $user->checkout_url2,
            'checkout_url3'     => $user->checkout_url3,
            'checkout_url4'     => $user->checkout_url4,
            'checkout_url5'     => $user->checkout_url5,
            'checkout_url6'     => $user->checkout_url6,
        ];
    }
}