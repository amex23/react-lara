import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    /** Text the user must type to confirm. Defaults to "Cancel". */
    confirmWord?: string;
    /** Extra classes for the trigger button. */
    className?: string;
}

export default function CancelSubscriptionModal({
    confirmWord = 'Cancel',
    className = '',
}: Props) {
    const [open, setOpen] = useState(false);
    const [typed, setTyped] = useState('');
    const [processing, setProcessing] = useState(false);

    const matches = typed.trim().toLowerCase() === confirmWord.toLowerCase();

    const close = () => {
        if (processing) return;
        setOpen(false);
        setTyped('');
    };

    const confirmCancel = () => {
        if (!matches) return;
        setProcessing(true);
        router.visit('/subscription/cancel', {
            method: 'get',
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <>
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setOpen(true)}
                className={'text-white bg-red-500 text-xs ' + className}
            >
                Cancel Subscription
            </Button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={close}
                >
                    <div
                        className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-bold text-gray-900">
                            Cancel your subscription?
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                            Your store stays live until the end of the current billing
                            period, then it will be deactivated. This can't be undone from
                            here — you'd need to subscribe again.
                        </p>

                        <div className="mt-4 space-y-1.5">
                            <Label htmlFor="cancel-confirm" className="text-sm text-gray-700">
                                Type <span className="font-semibold">{confirmWord}</span> to confirm
                            </Label>
                            <Input
                                id="cancel-confirm"
                                value={typed}
                                onChange={(e) => setTyped(e.target.value)}
                                placeholder={confirmWord}
                                autoComplete="off"
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && matches) confirmCancel();
                                }}
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={close}
                                disabled={processing}
                            >
                                Keep subscription
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                onClick={confirmCancel}
                                disabled={!matches || processing}
                                className="bg-red-600 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? 'Cancelling…' : 'Cancel subscription'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
