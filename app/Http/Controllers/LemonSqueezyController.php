<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\LemonSqueezyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LemonSqueezyController extends Controller
{
    public function webhook(Request $request)
    {
        // 1. Verify signature
        $secret    = env('LEMONSQUEEZY_WEBHOOK_SECRET');
        $signature = $request->header('X-Signature');
        $body      = $request->getContent();

        if (!$signature || !$secret) {
            return response()->json(['error' => 'Missing signature or secret'], 400);
        }

        $computed = hash_hmac('sha256', $body, $secret);
        if (!hash_equals($computed, $signature)) {
            Log::warning('[LemonSqueezy] Invalid webhook signature');
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // 2. Parse payload
        $payload   = $request->json()->all();
        $eventName = $payload['meta']['event_name'] ?? null;
        $custom    = $payload['meta']['custom_data'] ?? [];
        $data      = $payload['data'] ?? [];
        $attrs     = $data['attributes'] ?? [];

        Log::info("[LemonSqueezy] Event: {$eventName}");

        // 3. Route events
        match ($eventName) {
            'subscription_created',
            'subscription_updated',
            'subscription_resumed',
            'subscription_unpaused',
            'subscription_plan_changed' => $this->handleActivated($data, $attrs, $custom),
            'subscription_cancelled'    => $this->handleCancelled($data, $attrs, $custom),
            'subscription_expired'      => $this->handleExpired($data, $attrs, $custom),
            default => null,
        };

        return response()->json(['ok' => true]);
    }

    private function findUser(array $attrs, array $custom = []): ?User
    {
        // custom_data.user_id is set on our checkout links — most reliable.
        if (!empty($custom['user_id'])) {
            if ($user = User::find($custom['user_id'])) {
                return $user;
            }
        }

        $email = $attrs['user_email'] ?? null;

        return $email ? User::where('email', $email)->first() : null;
    }

    private function handleActivated(array $data, array $attrs, array $custom = []): void
    {
        $user = $this->findUser($attrs, $custom);
        if (!$user) return;

        $status   = $attrs['status'] ?? 'active';
        $isActive = in_array($status, ['active', 'on_trial']);

        $variantId = (string) ($attrs['variant_id'] ?? '');

        // Variant id is the source of truth for which tier they bought.
        $plan = LemonSqueezyService::planFromVariantId($variantId)
            ?? ($custom['plan'] ?? null)
            ?? $user->plan
            ?? config('plans.default');

        $user->fill([
            'subscription'       => $isActive,
            'plan'               => $plan,
            'ls_subscription_id' => (string) ($data['id'] ?? ''),
            'ls_customer_id'     => (string) ($attrs['customer_id'] ?? ''),
            'ls_variant_id'      => $variantId,
            'ls_status'          => $status,
            'ls_renews_at'       => $attrs['renews_at'] ?? null,
            'ls_ends_at'         => $attrs['ends_at'] ?? null,
        ]);

        // Keep display_count inside the new plan's bounds (e.g. after a downgrade).
        $user->display_count = $user->effectiveDisplayCount();

        $user->save();

        Log::info("[LemonSqueezy] Activated user #{$user->id} — plan: {$plan}, status: {$status}");
    }

    private function handleCancelled(array $data, array $attrs, array $custom = []): void
    {
        $user = $this->findUser($attrs, $custom);
        if (!$user) return;

        // Keep subscription = true until it actually expires
        $user->update([
            'ls_subscription_id' => (string) ($data['id'] ?? ''),
            'ls_status'          => 'cancelled',
            'ls_ends_at'         => $attrs['ends_at'] ?? null,
        ]);

        Log::info("[LemonSqueezy] Cancelled user #{$user->id} — access until: " . ($attrs['ends_at'] ?? 'unknown'));
    }

    private function handleExpired(array $data, array $attrs, array $custom = []): void
    {
        $user = $this->findUser($attrs, $custom);
        if (!$user) return;

        // Drop entitlements back to basic but never delete their uploaded media.
        $user->update([
            'subscription'       => false,
            'plan'               => config('plans.default'),
            'display_count'      => config('plans.plans.' . config('plans.default') . '.min_display'),
            'ls_subscription_id' => (string) ($data['id'] ?? ''),
            'ls_status'          => 'expired',
        ]);

        Log::info("[LemonSqueezy] Expired user #{$user->id} — access revoked");
    }
}