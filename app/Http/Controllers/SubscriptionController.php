<?php

namespace App\Http\Controllers;

use App\Services\LemonSqueezyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function __construct(private LemonSqueezyService $ls) {}

    /**
     * GET  /subscribe/{plan?}   — new customer, send them to hosted checkout.
     * POST /subscribe/{plan}    — existing customer, switch plan via the API.
     *
     * The distinction that matters is whether Lemon Squeezy already has a live
     * subscription for this user. If it does we PATCH it (prorated); if it
     * doesn't we send them to a fresh checkout at the full plan price.
     */
    public function checkout(string $plan = 'basic')
    {
        $user = Auth::user();

        abort_unless(array_key_exists($plan, config('plans.plans')), 404);

        if ($this->hasLiveSubscription($user)) {
            return $this->change($plan);
        }

        $url = $this->ls->checkoutUrl($user, $plan);

        if (! $url) {
            return back()->with('error', 'Checkout is not configured for this plan yet.');
        }

        return $this->away($url);
    }

    /**
     * Upgrade / downgrade an existing subscription.
     */
    public function change(string $plan)
    {
        $user = Auth::user();

        abort_unless(array_key_exists($plan, config('plans.plans')), 404);

        if (! $this->hasLiveSubscription($user)) {
            $url = $this->ls->checkoutUrl($user, $plan);

            return $url
                ? $this->away($url)
                : back()->with('error', 'Checkout is not configured for this plan yet.');
        }

        if ($user->plan === $plan && $user->subscription) {
            return back()->with('message', "You're already on the {$plan} plan.");
        }

        $response = $this->ls->changePlan($user, $plan);

        if (! $response->successful()) {
            return back()->with('error', 'We could not switch your plan. Please try again or contact support.');
        }

        $attrs = $response->json('data.attributes', []);

        // Optimistic local update; the subscription_updated / subscription_plan_changed
        // webhook is the source of truth and will confirm this shortly.
        $user->update([
            'plan'          => $plan,
            'ls_variant_id' => (string) ($attrs['variant_id'] ?? config("plans.plans.{$plan}.variant_id")),
            'ls_status'     => $attrs['status'] ?? $user->ls_status,
            'ls_renews_at'  => $attrs['renews_at'] ?? $user->ls_renews_at,
            'display_count' => $user->effectiveDisplayCount(),
        ]);

        $label    = config("plans.plans.{$plan}.label");
        $price    = config("plans.plans.{$plan}.price");
        $currency = config("plans.plans.{$plan}.currency");
        $symbol   = $currency === 'PHP' ? '₱' : '$';

        $note = config('plans.invoice_immediately')
            ? "You've been charged the prorated difference for the rest of this billing period."
            : "The prorated difference will appear on your next invoice.";

        return redirect()
            ->route('dashboard')
            ->with('message', "You're on the {$label} plan — {$symbol}" . number_format($price) . "/month. {$note}");
    }

    public function cancel()
    {
        $user = Auth::user();

        if (! $user->ls_subscription_id) {
            return redirect()->route('dashboard')->with('message', 'No active subscription found.');
        }

        $response = $this->ls->cancel($user);

        if ($response->successful()) {
            $user->update([
                'ls_status'  => 'cancelled',
                'ls_ends_at' => $response->json('data.attributes.ends_at') ?? $user->ls_ends_at,
            ]);

            return redirect()->route('dashboard')
                ->with('message', 'Subscription cancelled. Your store stays live until the end of the billing period.');
        }

        return redirect()->route('dashboard')->with('error', 'Could not cancel. Please contact support.');
    }

    /**
     * Inertia swallows a normal 302 to an external host, so hand it the
     * 409 + X-Inertia-Location response it expects when the request came
     * from the client-side router.
     */
    private function away(string $url)
    {
        return request()->header('X-Inertia')
            ? Inertia::location($url)
            : redirect()->away($url);
    }

    /**
     * Live means Lemon Squeezy will still accept a plan change:
     * active, on trial, past due, paused, or cancelled-but-not-yet-expired.
     */
    private function hasLiveSubscription($user): bool
    {
        return filled($user->ls_subscription_id)
            && in_array($user->ls_status, ['active', 'on_trial', 'past_due', 'paused', 'cancelled'], true);
    }
}