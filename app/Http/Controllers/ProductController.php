<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
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
            'plan'     => $this->planPayload($authUser),
        ]);
    }

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

        $validated = $request->validate($this->rules($authUser));

        $updates = $this->baseUpdates($validated, $authUser);
        $updates += $this->handleMediaUploads($request, $authUser, $authUser);

        $authUser->update($updates);

        return redirect()->route($this->indexRoute())
            ->with('message', 'Store profile created successfully.');
    }

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
            'plan'       => $this->planPayload($product),
            'indexRoute' => route($this->indexRoute()),
        ]);
    }

    public function update(Request $request, User $product)
    {
        $this->authorizeAccess($product);

        $validated = $request->validate($this->rules($product));

        $updates = $this->baseUpdates($validated, $product);
        $updates += $this->handleMediaUploads($request, $product, $product);

        $product->update($updates);

        return redirect()->route($this->indexRoute())
            ->with('message', 'Store profile updated successfully.');
    }

    public function destroy(User $product)
    {
        $this->authorizeAccess($product);

        $cleared = [];

        foreach ($this->allSlots() as $i) {
            if ($product->{"image{$i}"}) {
                Storage::disk('public')->delete($product->{"image{$i}"});
            }
            $cleared["image{$i}"]        = null;
            $cleared["checkout_url{$i}"] = null;
        }

        $product->update($cleared + [
            'description'          => null,
            'price'                => null,
            'subscription'         => false,
            'default_checkout_url' => null,
        ]);

        return redirect()->route($this->indexRoute())
            ->with('message', 'Store profile cleared successfully.');
    }

    // ─────────────────────────────────────────────
    // Plan-aware validation & media handling
    // ─────────────────────────────────────────────

    /** All physical slots that exist as columns. */
    private function allSlots(): array
    {
        return range(1, (int) config('plans.media_columns'));
    }

    /**
     * Validation rules built from the target user's plan. A basic user simply
     * has no rules for slots 7–12, and image-only mime rules; a pro user gets
     * all 12 slots and may send video.
     */
    private function rules(User $target): array
    {
        $limit  = $target->mediaLimit();
        $upload = config('plans.uploads');

        $rules = [
            'name'                       => 'required|string|max:255',
            'description'                => 'nullable|string|max:3000',
            'price'                      => 'nullable|numeric|min:0',
            'currency'                   => 'nullable|string|in:USD,PHP,EUR,GBP,AUD,SGD,JPY',
            'subscription'               => 'nullable|boolean',
            'default_checkout_url'       => 'nullable|url|max:500',
            'shopify_webhook_secret'     => 'nullable|string|max:255',
            'woocommerce_webhook_secret' => 'nullable|string|max:255',
            'store_platform'             => 'nullable|in:shopify,woocommerce',
            'display_count'              => [
                'nullable',
                'integer',
                'min:' . $target->planConfig('min_display'),
                'max:' . $target->planConfig('max_display'),
            ],
        ];

        if ($target->allowsVideo()) {
            $mimes  = $upload['image_mimes'] . ',' . $upload['video_mimes'];
            $maxKb  = $upload['video_max_kb'];
            $base   = 'nullable|file|mimes:' . $mimes . '|max:' . $maxKb;
        } else {
            $base = 'nullable|image|mimes:' . $upload['image_mimes'] . '|max:' . $upload['image_max_kb'];
        }

        for ($i = 1; $i <= $limit; $i++) {
            $rules["image{$i}"]        = $base;
            $rules["checkout_url{$i}"] = 'nullable|url|max:500';
        }

        return $rules;
    }

    private function baseUpdates(array $validated, User $target): array
    {
        $updates = [
            'name'                       => $validated['name'],
            'description'                => $validated['description'] ?? null,
            'price'                      => $validated['price'] ?? null,
            'currency'                   => $validated['currency'] ?? 'USD',
            'subscription'               => isset($validated['subscription']) ? (bool) $validated['subscription'] : false,
            'default_checkout_url'       => $validated['default_checkout_url'] ?? null,
            'shopify_webhook_secret'     => $validated['shopify_webhook_secret'] ?? null,
            'woocommerce_webhook_secret' => $validated['woocommerce_webhook_secret'] ?? null,
            'store_platform'             => $validated['store_platform'] ?? null,
        ];

        // Checkout URLs, only for slots the plan allows.
        for ($i = 1; $i <= $target->mediaLimit(); $i++) {
            $updates["checkout_url{$i}"] = $validated["checkout_url{$i}"] ?? null;
        }

        if (array_key_exists('display_count', $validated) && $validated['display_count'] !== null) {
            $updates['display_count'] = max(
                (int) $target->planConfig('min_display'),
                min((int) $target->planConfig('max_display'), (int) $validated['display_count'])
            );
        }

        return $updates;
    }

    /**
     * Store uploaded media. Images and videos share the same image{N} column —
     * the type is inferred from the extension at read time.
     */
    private function handleMediaUploads(Request $request, User $target, User $owner): array
    {
        $updates   = [];
        $videoExts = config('plans.uploads.video_exts');

        for ($i = 1; $i <= $target->mediaLimit(); $i++) {
            $key = "image{$i}";

            if (! $request->hasFile($key)) {
                continue;
            }

            $file = $request->file($key);
            $ext  = strtolower($file->getClientOriginalExtension());

            // Belt and braces: reject video from a plan that doesn't allow it,
            // even if the request bypassed the form.
            if (in_array($ext, $videoExts, true) && ! $target->allowsVideo()) {
                continue;
            }

            if ($target->$key) {
                Storage::disk('public')->delete($target->$key);
            }

            $folder = in_array($ext, $videoExts, true) ? 'store-videos' : 'store-images';

            $updates[$key] = $file->store($folder, 'public');
        }

        return $updates;
    }

    private function planPayload(User $user): array
    {
        return [
            'key'           => $user->effectivePlan(),
            'label'         => $user->planConfig('label'),
            'media_limit'   => $user->mediaLimit(),
            'allows_video'  => $user->allowsVideo(),
            'min_display'   => (int) $user->planConfig('min_display'),
            'max_display'   => (int) $user->planConfig('max_display'),
            'display_count' => $user->effectiveDisplayCount(),
            'video_mimes'   => config('plans.uploads.video_mimes'),
            'image_mimes'   => config('plans.uploads.image_mimes'),
        ];
    }

    // ─────────────────────────────────────────────
    // Unchanged helpers
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
        $payload = [
            'id'                     => $user->id,
            'name'                   => $user->name,
            'user_id'                => $user->id,
            'owner_name'             => $user->name,
            'description'            => $user->description,
            'price'                  => $user->price,
            'currency'               => $user->currency ?? 'USD',
            'subscription'           => (bool) $user->subscription,
            'plan'                   => $user->effectivePlan(),
            'plan_label'             => $user->planConfig('label'),
            'media_limit'            => $user->mediaLimit(),
            'allows_video'           => $user->allowsVideo(),
            'display_count'          => $user->effectiveDisplayCount(),
            'max_display'            => (int) $user->planConfig('max_display'),
            'min_display'            => (int) $user->planConfig('min_display'),
            'ls_status'              => $user->ls_status,
            'ls_subscription_id'     => $user->ls_subscription_id,
            'store_platform'         => $user->store_platform,
            'has_shopify_secret'     => !empty($user->shopify_webhook_secret),
            'has_woocommerce_secret' => !empty($user->woocommerce_webhook_secret),
            'profile_views'          => (int) ($user->profile_views ?? 0),
            'profile_checkouts'      => (int) ($user->profile_checkouts ?? 0),
            'default_checkout_url'   => $user->default_checkout_url,
            'media'                  => $user->mediaItems(),
        ];

        // Flat keys kept for backwards compatibility with existing components.
        foreach ($this->allSlots() as $i) {
            $payload["image{$i}_url"]  = $user->{"image{$i}"} ? Storage::url($user->{"image{$i}"}) : null;
            $payload["image{$i}_type"] = $user->mediaType($i);
            $payload["checkout_url{$i}"] = $user->{"checkout_url{$i}"};
        }

        return $payload;
    }
}
