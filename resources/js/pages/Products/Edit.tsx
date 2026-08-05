import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert, CheckCircle } from 'lucide-react';

interface PlanPayload {
    key: string;
    label: string;
    media_limit: number;
    allows_video: boolean;
    min_display: number;
    max_display: number;
    display_count: number;
    video_mimes: string;
    image_mimes: string;
}

export default function Edit() {
    const { product, targetUser, authUser, indexRoute, plan } = usePage().props as {
        product: any;
        targetUser: { id: number; name: string; user_type: string };
        authUser: any;
        indexRoute: string;
        plan: PlanPayload;
    };

    const [showSuccess, setShowSuccess] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: authUser?.user_type === 'admin' ? 'Products' : 'Dashboard', href: indexRoute },
        { title: 'Edit Store Profile', href: '#' },
    ];

    const isAdmin      = authUser?.user_type === 'admin';
    const isOwnProfile = targetUser?.id === authUser?.id;

    // How many upload slots this user's plan allows (6 for Basic, 12 for Pro).
    const mediaLimit = plan?.media_limit ?? 6;
    const slots      = Array.from({ length: mediaLimit }, (_, i) => i + 1);

    // Whether the storefront display-count selector should appear (Pro only).
    const showDisplayCount = (plan?.max_display ?? 6) > (plan?.min_display ?? 6);

    // Accept string for file inputs, built from the plan.
    const fileAccept = plan?.allows_video
        ? 'image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime'
        : 'image/jpeg,image/png,image/webp,image/gif';

    // Build the initial form object dynamically so the slot count follows the plan.
    const initialData: Record<string, unknown> = {
        _method:               'PUT',
        name:                  product.name                  ?? '',
        description:           product.description           ?? '',
        price:                 product.price                 ?? '',
        currency:              product.currency              ?? 'USD',
        subscription:          !!product.subscription,
        default_checkout_url:  product.default_checkout_url  ?? '',
        shopify_webhook_secret:     '',
        woocommerce_webhook_secret: '',
        store_platform:        product.store_platform        ?? '',
        display_count:         product.display_count         ?? plan?.display_count ?? mediaLimit,
    };
    slots.forEach((idx) => {
        initialData[`image${idx}`]        = null;
        initialData[`checkout_url${idx}`] = product[`checkout_url${idx}`] ?? '';
    });

    const { data, setData, post, processing, errors } = useForm(initialData);

    const basePath = isAdmin ? '/products' : '/dashboard';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`${basePath}/${product.id}`, {
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => {
                    window.location.href = indexRoute;
                }, 2000);
            },
        });
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: string,
    ) => {
        const file = e.target.files?.[0];
        if (file) setData(key, file);
    };

    const videoExts = ['mp4', 'webm', 'mov', 'm4v'];
    const isVideoUrl = (url?: string | null) =>
        !!url && videoExts.includes(url.split('.').pop()?.toLowerCase() ?? '');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${product.name || 'Store Profile'}`} />

            {/* Success popup overlay */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-in fade-in duration-200">
                    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4 animate-in zoom-in duration-200">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Success!</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Store profile updated successfully
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
                    </div>
                </div>
            )}

            <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Edit Store Profile</h1>

                    <div className="flex items-center gap-2">
                        {plan && (
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                plan.key === 'pro'
                                    ? 'bg-violet-100 text-violet-700 border border-violet-200'
                                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>
                                {plan.label} plan
                            </span>
                        )}

                        {isAdmin && !isOwnProfile && (
                            <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded">
                                Editing store of: <strong>{targetUser?.name}</strong>
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Errors:</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc pl-5 mt-2">
                                    {Object.entries(errors).map(([key, msg]) => (
                                        <li key={key}>{msg as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Store / Display Name *</Label>
                        <Input
                            id="name"
                            value={data.name as string}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description as string}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={5}
                        />
                    </div>

                    {/* Default Checkout URL — visible to all users */}
                    <div className="space-y-2">
                        <Label htmlFor="default_checkout_url">Default Checkout URL</Label>
                        <Input
                            id="default_checkout_url"
                            type="url"
                            placeholder="https://yourstore.myshopify.com/cart"
                            value={data.default_checkout_url as string}
                            onChange={(e) => setData('default_checkout_url', e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                            Used as fallback when an image doesn't have its own checkout URL.
                        </p>
                        {errors.default_checkout_url && (
                            <p className="text-xs text-red-500">{errors.default_checkout_url as string}</p>
                        )}
                    </div>

                    {/* Store Platform */}
                    <div className="space-y-2">
                        <Label>Store Platform</Label>
                        <div className="flex gap-3">
                            {['shopify', 'woocommerce'].map((platform) => (
                                <button
                                    key={platform}
                                    type="button"
                                    onClick={() => setData('store_platform', platform)}
                                    className={`flex-1 py-2.5 px-4 rounded-lg border text-sm font-medium transition-all ${
                                        data.store_platform === platform
                                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                                    }`}
                                >
                                    {platform === 'shopify' ? '🛍 Shopify' : '🔌 WooCommerce'}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Select your store platform so ShopMyDay knows how to verify your orders.
                        </p>
                    </div>

                    {/* Shopify Webhook Secret */}
                    {(data.store_platform === 'shopify' || data.store_platform === '') && (
                        <div className="space-y-2 p-4 rounded-xl border border-slate-200 bg-slate-50">
                            <Label htmlFor="shopify_webhook_secret" className="font-semibold">
                                🛍 Shopify Webhook Secret
                            </Label>
                            <Input
                                id="shopify_webhook_secret"
                                type="password"
                                placeholder="Paste your Shopify webhook signing secret"
                                value={data.shopify_webhook_secret as string}
                                onChange={(e) => setData('shopify_webhook_secret', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                                Found in Shopify Admin → Settings → Notifications → Webhooks → your webhook → Signing secret.
                            </p>
                            {product.has_shopify_secret && !data.shopify_webhook_secret && (
                                <p className="text-xs text-green-600 font-medium">✓ Webhook secret already saved</p>
                            )}
                        </div>
                    )}

                    {/* WooCommerce Webhook Secret */}
                    {(data.store_platform === 'woocommerce' || data.store_platform === '') && (
                        <div className="space-y-2 p-4 rounded-xl border border-slate-200 bg-slate-50">
                            <Label htmlFor="woocommerce_webhook_secret" className="font-semibold">
                                🔌 WooCommerce Webhook Secret
                            </Label>
                            <Input
                                id="woocommerce_webhook_secret"
                                type="password"
                                placeholder="Paste your WooCommerce webhook secret"
                                value={data.woocommerce_webhook_secret as string}
                                onChange={(e) => setData('woocommerce_webhook_secret', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                                Found in WordPress Admin → WooCommerce → Settings → Advanced → Webhooks → your webhook → Secret.
                            </p>
                            {product.has_woocommerce_secret && !data.woocommerce_webhook_secret && (
                                <p className="text-xs text-green-600 font-medium">✓ Webhook secret already saved</p>
                            )}
                        </div>
                    )}

                    {/* Price — admin only */}
                    {isAdmin && (
                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <div className="flex gap-2">
                                <select
                                    value={data.currency as string}
                                    onChange={(e) => setData('currency', e.target.value)}
                                    className="border border-input rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="USD">$ USD</option>
                                    <option value="PHP">₱ PHP</option>
                                    <option value="EUR">€ EUR</option>
                                    <option value="GBP">£ GBP</option>
                                    <option value="AUD">A$ AUD</option>
                                    <option value="SGD">S$ SGD</option>
                                    <option value="JPY">¥ JPY</option>
                                </select>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price as string}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="flex-1"
                                />
                            </div>
                        </div>
                    )}

                    {/* Subscription — admin only */}
                    {isAdmin && (
                        <div className="flex items-center space-x-2 p-3 rounded-lg border border-dashed border-slate-300 bg-slate-50">
                            <Checkbox
                                id="subscription"
                                checked={data.subscription as boolean}
                                onCheckedChange={(checked) =>
                                    setData('subscription', !!checked)
                                }
                            />
                            <div className="flex flex-col">
                                <Label htmlFor="subscription" className="font-semibold cursor-pointer">
                                    Connect to Shopify
                                </Label>
                                <span className="text-xs text-muted-foreground mt-0.5">
                                    When enabled, this user's images and stats will be live on the Shopify store.
                                    When disabled, their profile will be hidden from Shopify.
                                </span>
                            </div>
                            <span className={`ml-auto text-xs font-semibold px-2 py-1 rounded-full ${
                                data.subscription
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-slate-200 text-slate-500'
                            }`}>
                                {data.subscription ? '✓ Connected' : '✗ Not Connected'}
                            </span>
                        </div>
                    )}

                    {/* Storefront display count — Pro only */}
                    {showDisplayCount && (
                        <div className="space-y-2 p-4 rounded-xl border border-violet-200 bg-violet-50">
                            <Label htmlFor="display_count" className="font-semibold text-violet-800">
                                Items shown on your storefront
                            </Label>
                            <select
                                id="display_count"
                                value={data.display_count as number}
                                onChange={(e) => setData('display_count', Number(e.target.value))}
                                className="w-full rounded-md border border-violet-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-300"
                            >
                                {Array.from(
                                    { length: plan.max_display - plan.min_display + 1 },
                                    (_, i) => plan.min_display + i,
                                ).map((n) => (
                                    <option key={n} value={n}>{n} items</option>
                                ))}
                            </select>
                            <p className="text-xs text-violet-700/70">
                                Empty slots are skipped, so this is a maximum — not a requirement.
                            </p>
                        </div>
                    )}

                    {/* Media + Checkout URLs */}
                    <div>
                        <h2 className="text-sm font-semibold text-slate-700 mb-3">
                            {plan?.allows_video ? 'Media' : 'Images'} &amp; Checkout Links
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {slots.map((idx) => {
                                const imageKey    = `image${idx}`;
                                const urlKey      = `image${idx}_url`;
                                const checkoutKey = `checkout_url${idx}`;
                                const currentUrl  = product[urlKey] as string | null;
                                const currentType = (product[`image${idx}_type`] as string | null)
                                    ?? (isVideoUrl(currentUrl) ? 'video' : 'image');

                                return (
                                    <div key={idx} className="space-y-2 border rounded-xl p-4 bg-slate-50">
                                        <Label className="font-semibold text-slate-700 flex items-center gap-2">
                                            Slot {idx}
                                            {idx > 6 && (
                                                <span className="text-[10px] font-bold uppercase tracking-wide text-violet-600 bg-violet-100 px-1.5 py-0.5 rounded">
                                                    Pro
                                                </span>
                                            )}
                                        </Label>

                                        {currentUrl && (
                                            currentType === 'video' ? (
                                                <video
                                                    src={currentUrl}
                                                    className="h-24 w-24 object-cover rounded-lg border shadow-sm"
                                                    muted
                                                    loop
                                                    autoPlay
                                                    playsInline
                                                />
                                            ) : (
                                                <img
                                                    src={currentUrl}
                                                    alt={`Current media ${idx}`}
                                                    className="h-24 w-24 object-cover rounded-lg border shadow-sm"
                                                />
                                            )
                                        )}

                                        <Input
                                            id={imageKey}
                                            type="file"
                                            accept={fileAccept}
                                            onChange={(e) => handleFileChange(e, imageKey)}
                                            className="text-sm"
                                        />

                                        {plan?.allows_video && (
                                            <p className="text-[11px] text-muted-foreground">
                                                Image or video (mp4, webm, mov · up to 50 MB)
                                            </p>
                                        )}

                                        {data[imageKey] && (
                                            <p className="text-xs text-muted-foreground truncate">
                                                New: {(data[imageKey] as File).name}
                                            </p>
                                        )}

                                        <div className="pt-1 space-y-1">
                                            <Label htmlFor={checkoutKey} className="text-xs text-muted-foreground">
                                                Checkout URL
                                            </Label>
                                            <Input
                                                id={checkoutKey}
                                                type="url"
                                                placeholder="https://yourstore.myshopify.com/products/..."
                                                value={(data[checkoutKey] as string) ?? ''}
                                                onChange={(e) => setData(checkoutKey, e.target.value)}
                                                className="text-xs"
                                            />
                                            {errors[checkoutKey] && (
                                                <p className="text-xs text-red-500">
                                                    {errors[checkoutKey] as string}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                            {processing ? 'Saving…' : 'Save Changes'}
                        </Button>
                        <Button variant="outline" className="w-full sm:w-auto" asChild>
                            <a href={indexRoute}>Cancel</a>
                        </Button>
                        <Button variant="outline" className="w-full sm:w-auto sm:ml-auto" asChild>
                            <a href={indexRoute}>Back to Dashboard</a>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
