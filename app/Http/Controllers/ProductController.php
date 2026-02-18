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
            // Admins see every user's store profile at /products
            $users = User::all();
        } else {
            // Regular users see only their own profile at /dashboard
            $users = User::where('id', $authUser->id)->get();
        }

        $products = $users->map(fn($user) => $this->formatUser($user));

        return Inertia::render('Products/Index', [
            'products'   => $products,
            'authUser'   => $authUser,
            'createUrl'  => $this->actionRoute('create'),
            'editUrlBase'=> Auth::user()->user_type === 'admin' ? '/products' : '/dashboard',
        ]);
    }

    // ─────────────────────────────────────────────
    // CREATE FORM
    // ─────────────────────────────────────────────
    public function create()
    {
        $authUser = Auth::user();

        // Admins create new users via /register-admin, not here
        if ($authUser->user_type === 'admin') {
            return redirect()->route('register.admin');
        }

        // Regular users can only create once (their own profile)
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

        // Admins create new users via /register-admin, not here
        if ($authUser->user_type === 'admin') {
            return redirect()->route('register.admin');
        }

        // Guard: regular users may only create once
        if ($this->userHasProfile($authUser)) {
            return redirect()->route($this->indexRoute())
                ->with('message', 'You already have a store profile.');
        }

        $rules = [
            'name'         => 'required|string|max:255',
            'description'  => 'nullable|string|max:3000',
            'price'        => 'nullable|numeric|min:0',
            'subscription' => 'nullable|boolean',
            'image1'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image2'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image3'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image4'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image5'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image6'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
        ];

        $validated = $request->validate($rules);

        $updates = [
            'name'         => $validated['name'],
            'description'  => $validated['description'] ?? null,
            'price'        => $validated['price'] ?? null,
            'subscription' => isset($validated['subscription']) ? (bool) $validated['subscription'] : false,
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

        $rules = [
            'name'         => 'required|string|max:255',
            'description'  => 'nullable|string|max:3000',
            'price'        => 'nullable|numeric|min:0',
            'subscription' => 'nullable|boolean',
            'image1'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image2'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image3'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image4'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image5'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'image6'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
        ];

        $validated = $request->validate($rules);

        $updates = [
            'name'         => $validated['name'],
            'description'  => $validated['description'] ?? null,
            'price'        => $validated['price'] ?? null,
            'subscription' => isset($validated['subscription']) ? (bool) $validated['subscription'] : false,
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
    // DELETE  (clears profile fields, keeps the user account)
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
            'description'  => null,
            'price'        => null,
            'subscription' => false,
            'image1'       => null,
            'image2'       => null,
            'image3'       => null,
            'image4'       => null,
            'image5'       => null,
            'image6'       => null,
        ]);

        return redirect()->route($this->indexRoute())
            ->with('message', 'Store profile cleared successfully.');
    }

    // ─────────────────────────────────────────────
    // HELPERS
    // ─────────────────────────────────────────────

    /**
     * Returns the correct index route name depending on who is logged in.
     * Admins land on products.index (/products); users land on dashboard (/dashboard).
     */
    private function indexRoute(): string
    {
        return Auth::user()->user_type === 'admin' ? 'products.index' : 'dashboard';
    }

    /**
     * Returns the correct named route for a given action based on user type.
     * Admins use products.* routes; regular users use dashboard.* routes.
     */
    private function actionRoute(string $action, mixed $id = null): string
    {
        $isAdmin = Auth::user()->user_type === 'admin';
        $name    = $isAdmin ? "products.{$action}" : "dashboard.{$action}";
        return $id ? route($name, $id) : route($name);
    }

    /**
     * A profile is considered "filled" when at least one of these fields is set.
     */
    private function userHasProfile(User $user): bool
    {
        return filled($user->description)
            || filled($user->image1)
            || filled($user->price);
    }

    /**
     * Only admins or the owning user may touch a profile.
     */
    private function authorizeAccess(User $targetUser): void
    {
        $auth = Auth::user();

        if ($auth->user_type !== 'admin' && $targetUser->id !== $auth->id) {
            abort(403, 'You do not have permission to edit this store profile.');
        }
    }

    /**
     * Normalise a User row into the shape the front-end expects.
     */
    private function formatUser(User $user): array
    {
        return [
            'id'           => $user->id,
            'name'         => $user->name,
            'user_id'      => $user->id,
            'owner_name'   => $user->name,
            'description'  => $user->description,
            'price'        => $user->price,
            'subscription' => (bool) $user->subscription,
            'image1_url'   => $user->image1 ? Storage::url($user->image1) : null,
            'image2_url'   => $user->image2 ? Storage::url($user->image2) : null,
            'image3_url'   => $user->image3 ? Storage::url($user->image3) : null,
            'image4_url'   => $user->image4 ? Storage::url($user->image4) : null,
            'image5_url'   => $user->image5 ? Storage::url($user->image5) : null,
            'image6_url'   => $user->image6 ? Storage::url($user->image6) : null,
        ];
    }
}