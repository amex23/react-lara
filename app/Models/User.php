<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'user_type',
        'store_name',
        'price',
        'currency',
        'description',
        'image1','image2','image3','image4','image5','image6',
        'image7','image8','image9','image10','image11','image12',
        'subscription',
        'plan',
        'display_count',
        'shopify_customer_id',
        'shopify_webhook_secret',
        'woocommerce_webhook_secret',
        'store_platform',
        'profile_views',
        'profile_checkouts',
        'checkout_url1', 'checkout_url2', 'checkout_url3',
        'checkout_url4', 'checkout_url5', 'checkout_url6',
        'checkout_url7', 'checkout_url8', 'checkout_url9',
        'checkout_url10', 'checkout_url11', 'checkout_url12',
        'default_checkout_url',
        // Lemon Squeezy
        'ls_subscription_id',
        'ls_customer_id',
        'ls_variant_id',
        'ls_status',
        'ls_renews_at',
        'ls_ends_at',
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
        'shopify_webhook_secret',
        'woocommerce_webhook_secret',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at'       => 'datetime',
            'password'                => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'ls_renews_at'            => 'datetime',
            'ls_ends_at'              => 'datetime',
            'subscription'            => 'boolean',
            'display_count'           => 'integer',
        ];
    }

    // ─────────────────────────────────────────────
    // Plan helpers
    // ─────────────────────────────────────────────

    /**
     * The plan the user is actually entitled to right now.
     * An unpaid / expired user always falls back to basic limits, but we never
     * delete their extra media — it simply stops being served.
     */
    public function effectivePlan(): string
    {
        if (! $this->subscription) {
            return config('plans.default');
        }

        return array_key_exists($this->plan, config('plans.plans'))
            ? $this->plan
            : config('plans.default');
    }

    public function planConfig(?string $key = null): mixed
    {
        $plan = config('plans.plans.' . $this->effectivePlan());

        return $key ? ($plan[$key] ?? null) : $plan;
    }

    public function isPro(): bool
    {
        return $this->effectivePlan() === 'pro';
    }

    /** How many slots this user may upload to (6 or 12). */
    public function mediaLimit(): int
    {
        return (int) $this->planConfig('media_limit');
    }

    public function allowsVideo(): bool
    {
        return (bool) $this->planConfig('allows_video');
    }

    /** display_count clamped into the plan's allowed range. */
    public function effectiveDisplayCount(): int
    {
        $min = (int) $this->planConfig('min_display');
        $max = (int) $this->planConfig('max_display');

        return max($min, min($max, (int) ($this->display_count ?: $min)));
    }

    // ─────────────────────────────────────────────
    // Media helpers
    // ─────────────────────────────────────────────

    /** 'image' | 'video' | null */
    public function mediaType(int $slot): ?string
    {
        $path = $this->{"image{$slot}"};

        if (! $path) {
            return null;
        }

        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));

        return in_array($ext, config('plans.uploads.video_exts'), true) ? 'video' : 'image';
    }

    /**
     * Non-empty media slots, capped by the plan and (optionally) by
     * display_count for public-facing output.
     *
     * @return array<int, array{slot:int,url:string,type:string,checkout_url:?string}>
     */
    public function mediaItems(bool $publicOnly = false): array
    {
        $cap = $publicOnly
            ? min($this->effectiveDisplayCount(), $this->mediaLimit())
            : $this->mediaLimit();

        $items = [];

        for ($i = 1; $i <= $cap; $i++) {
            if (! $this->{"image{$i}"}) {
                continue;
            }

            $items[] = [
                'slot'         => $i,
                'url'          => Storage::url($this->{"image{$i}"}),
                'type'         => $this->mediaType($i),
                'checkout_url' => $this->{"checkout_url{$i}"} ?: $this->default_checkout_url,
            ];
        }

        return $items;
    }
}
