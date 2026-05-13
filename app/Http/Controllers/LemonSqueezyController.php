<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        $data      = $payload['data'] ?? [];
        $attrs     = $data['attributes'] ?? [];

        Log::info("[LemonSqueezy] Event: {$eventName}");

        // 3. Route events
        match ($eventName) {
            'subscription_created',
            'subscription_updated'  => $this->handleActivated($data, $attrs),
            'subscription_cancelled' => $this->handleCancelled($data, $attrs),
            'subscription_expired'  => $this->handleExpired($data, $attrs),
            default => null,
        };

        return response()->json(['ok' => true]);
    }

    private function findUser(array $attrs): ?User
    {
        $email = $attrs['user_email'] ?? null;
        if (!$email) return null;
        return User::where('email', $email)->first();
    }

    private function handleActivated(array $data, array $attrs): void
    {
        $user = $this->findUser($attrs);
        if (!$user) return;

        $status   = $attrs['status'] ?? 'active';
        $isActive = in_array($status, ['active', 'on_trial']);

        $user->update([
            'subscription'       => $isActive,
            'ls_subscription_id' => (string) ($data['id'] ?? ''),
            'ls_customer_id'     => (string) ($attrs['customer_id'] ?? ''),
            'ls_variant_id'      => (string) ($attrs['variant_id'] ?? ''),
            'ls_status'          => $status,
            'ls_renews_at'       => $attrs['renews_at'] ?? null,
            'ls_ends_at'         => $attrs['ends_at'] ?? null,
        ]);

        Log::info("[LemonSqueezy] Activated user #{$user->id} — status: {$status}");
    }

    private function handleCancelled(array $data, array $attrs): void
    {
        $user = $this->findUser($attrs);
        if (!$user) return;

        // Keep subscription = true until it actually expires
        $user->update([
            'ls_subscription_id' => (string) ($data['id'] ?? ''),
            'ls_status'          => 'cancelled',
            'ls_ends_at'         => $attrs['ends_at'] ?? null,
        ]);

        Log::info("[LemonSqueezy] Cancelled user #{$user->id} — access until: " . ($attrs['ends_at'] ?? 'unknown'));
    }

    private function handleExpired(array $data, array $attrs): void
    {
        $user = $this->findUser($attrs);
        if (!$user) return;

        $user->update([
            'subscription'       => false,
            'ls_subscription_id' => (string) ($data['id'] ?? ''),
            'ls_status'          => 'expired',
        ]);

        Log::info("[LemonSqueezy] Expired user #{$user->id} — access revoked");
    }
}