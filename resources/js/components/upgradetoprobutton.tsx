import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    /** Current plan key from the backend: 'basic' | 'pro' */
    plan?: string;
    /** True when Lemon Squeezy already has a live subscription for this user. */
    hasSubscription?: boolean;
    className?: string;
}

export default function UpgradeToProButton({
    plan = 'basic',
    hasSubscription = false,
    className = '',
}: Props) {
    const [processing, setProcessing] = useState(false);

    if (plan === 'pro') {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-700">
                ★ Pro plan active
            </span>
        );
    }

    const handleClick = () => {
        const message = hasSubscription
        ? 'Switch to Pro at ₱1,500/month?\n\nYou keep the time you already paid for on Basic — Lemon Squeezy credits the unused days and charges only the difference for the rest of this billing period.'
        : 'Continue to checkout for the Pro plan at ₱1,500/month?';

        if (!confirm(message)) return;

        setProcessing(true);
        router.post(
            '/subscribe/pro',
            {},
            { onFinish: () => setProcessing(false) },
        );
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={processing}
            className={
                'block rounded-xl bg-[#37B6FF] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 ' +
                className
            }
        >
            {processing
            ? 'Redirecting…'
            : hasSubscription
              ? 'Upgrade to Pro — ₱1,500/mo (prorated)'
              : 'Get Pro — ₱1,500/mo'}
        </button>
    );
}
