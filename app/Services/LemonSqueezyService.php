<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class LemonSqueezyService
{
    private const BASE = 'https://api.lemonsqueezy.com/v1';

    private function client()
    {
        return Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.lemonsqueezy.api_key', env('LEMONSQUEEZY_API_KEY')),
            'Accept'        => 'application/vnd.api+json',
            'Content-Type'  => 'application/vnd.api+json',
        ])->timeout(20);
    }

    /**
     * Hosted checkout URL for a first-time buyer, pre-filled with their details.
     */
    public function checkoutUrl(User $user, string $plan): ?string
    {
        $base = config("plans.plans.{$plan}.checkout_url");

        if (! $base) {
            return null;
        }

        $separator = str_contains($base, '?') ? '&' : '?';

        return $base . $separator . http_build_query([
            'checkout[email]'                  => $user->email,
            'checkout[name]'                   => $user->name,
            'checkout[custom][user_id]'        => $user->id,
            'checkout[custom][plan]'           => $plan,
            'embed'                            => 0,
        ]);
    }

    /**
     * Switch an existing subscription to a different variant.
     *
     * Lemon Squeezy prorates by default: the customer is credited for unused
     * time on the old plan and charged for the remainder of the cycle on the
     * new one. With invoice_immediately = true that difference is billed now;
     * otherwise it lands on the next renewal invoice.
     */
    public function changePlan(User $user, string $plan): Response
    {
        $variantId = config("plans.plans.{$plan}.variant_id");
        $productId = config("plans.plans.{$plan}.product_id");

        $attributes = array_filter([
            'variant_id' => $variantId ? (int) $variantId : null,
            'product_id' => $productId ? (int) $productId : null,
        ], fn ($v) => ! is_null($v));

        $attributes['invoice_immediately'] = config('plans.invoice_immediately');
        $attributes['disable_prorations']  = config('plans.disable_prorations');

        $response = $this->client()->patch(self::BASE . '/subscriptions/' . $user->ls_subscription_id, [
            'data' => [
                'type'       => 'subscriptions',
                'id'         => (string) $user->ls_subscription_id,
                'attributes' => $attributes,
            ],
        ]);

        if ($response->failed()) {
            Log::error('[LemonSqueezy] changePlan failed', [
                'user_id' => $user->id,
                'plan'    => $plan,
                'status'  => $response->status(),
                'body'    => $response->body(),
            ]);
        }

        return $response;
    }

    public function cancel(User $user): Response
    {
        return $this->client()->delete(self::BASE . '/subscriptions/' . $user->ls_subscription_id);
    }

    /**
     * Map a Lemon Squeezy variant id back to one of our plan keys.
     */
    public static function planFromVariantId(?string $variantId): ?string
    {
        if (! $variantId) {
            return null;
        }

        foreach (config('plans.plans') as $key => $plan) {
            if ((string) ($plan['variant_id'] ?? '') === (string) $variantId) {
                return $key;
            }
        }

        return null;
    }
}
