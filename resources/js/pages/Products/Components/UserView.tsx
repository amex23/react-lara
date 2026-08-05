import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import UpgradeToProButton from '@/components/upgradetoprobutton';
import { TrendingUp } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import StatsCalendar from './UserView/StatsCalendar';
import OrdersSection from './UserView/OrdersSection';
import ImageWithBadge from './UserView/ImageWithBadge';
import SubscribeButton from '@/components/SubscribeButton';
import { usePage } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    user_id: number;
    owner_name?: string;
    description?: string | null;
    price?: string | number | null;
    subscription?: boolean;
    currency?: string | null;
    ls_status?: string | null;
    ls_subscription_id?: string | null;
    image1_url?: string | null;
    image2_url?: string | null;
    image3_url?: string | null;
    image4_url?: string | null;
    image5_url?: string | null;
    image6_url?: string | null;
    plan?: string;
    plan_label?: string;
    media_limit?: number;
    allows_video?: boolean;
    display_count?: number;
    [key: string]: unknown;
}

interface UserViewProps {
    products: Product[];
    myProfile: Product | null;
    editUrlBase: string;
}

const videoExts = ['mp4', 'webm', 'mov', 'm4v'];
const isVideoUrl = (url?: string | null) =>
    !!url && videoExts.includes(url.split('.').pop()?.toLowerCase() ?? '');

const slotsFor = (product: Product) =>
    Array.from({ length: product.media_limit ?? 6 }, (_, k) => k + 1);

export default function UserView({ products, myProfile, editUrlBase }: UserViewProps) {

    const { flash } = usePage().props as { flash?: { message?: string; error?: string } };

    const [imageViews, setImageViews] = useState<Record<string, number>>({});
    const [monthCheckouts, setMonthCheckouts] = useState<number>(0);
    const [monthOrders, setMonthOrders]       = useState<number>(0);
    const [convLoading, setConvLoading]       = useState(true);
    const [convFrom, setConvFrom] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    });

    const [convTo, setConvTo] = useState(() => {
        const now = new Date();
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
    });

    useEffect(() => {
        if (!myProfile?.id || !myProfile?.subscription) return;
        fetch(`https://www.shopmyday.store/api/store-profile/${myProfile.id}/stats?filter=today`)
            .then(r => r.json())
            .then(data => { if (data.image_views) setImageViews(data.image_views); })
            .catch(() => {});
    }, [myProfile?.id, myProfile?.subscription]);

    useEffect(() => {
        if (!myProfile?.id || !myProfile?.subscription) { setConvLoading(false); return; }

        setConvLoading(true);
        const statsUrl = `https://www.shopmyday.store/api/store-profile/${myProfile.id}/stats?filter=range&from=${convFrom}&to=${convTo}`;
        const ordersUrl = `/api/orders?from=${convFrom}&to=${convTo}`;

        Promise.all([
            fetch(statsUrl).then(r => r.json()).catch(() => null),
            fetch(ordersUrl, { headers: { 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' }).then(r => r.json()).catch(() => null),
        ]).then(([statsData, ordersData]) => {
            setMonthCheckouts(statsData?.checkouts ?? 0);
            setMonthOrders(ordersData?.total ?? 0);
            setConvLoading(false);
        });
    }, [myProfile?.id, myProfile?.subscription, convFrom, convTo]);

    const conversionRate = monthCheckouts > 0 ? ((monthOrders / monthCheckouts) * 100) : 0;

    const isActiveSubscriber = (product: Product) => product.ls_status === 'active';

    const handleCancel = (e: React.MouseEvent) => {
        if (!confirm('Are you sure you want to cancel your subscription? Your store will remain active until the end of the billing period.')) {
            e.preventDefault();
        }
    };

    const renderMediaCell = (
        product: Product,
        i: number,
        size: 'sm' | 'lg',
    ) => {
        const url = product[`image${i}_url`] as string | null;
        if (!url) return null;

        const type = (product[`image${i}_type`] as string | null)
            ?? (isVideoUrl(url) ? 'video' : 'image');

        if (type === 'video') {
            const dim = size === 'sm' ? 'w-full h-[120px]' : 'w-full aspect-square';
            return (
                <div key={i} className={`relative ${dim}`}>
                    <video
                        src={url}
                        className="w-full h-full object-cover rounded border"
                        muted
                        loop
                        autoPlay
                        playsInline
                    />
                    <span className="absolute bottom-0.5 right-0.5 text-[9px] font-bold bg-black/60 text-white px-1 rounded">
                        &#9654;
                    </span>
                </div>
            );
        }

        const viewCount = imageViews[String(i)] ?? 0;
        return (
            <ImageWithBadge key={i} src={url} alt={`Media ${i}`} viewCount={viewCount} size={size} />
        );
    };

    return (
        <>
            {/* Flash messages — visible on every breakpoint */}
            {flash?.message && (
                <div className="mb-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                    {flash.message}
                </div>
            )}

            {flash?.error && (
                <div className="mb-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {flash.error}
                </div>
            )}

            {/* Not subscribed — show subscribe CTA */}
            {!myProfile?.subscription && (
                <div className="mb-2 p-5 bg-yellow-50 border border-yellow-200 rounded-xl text-center flex flex-col items-center gap-3">
                    <p className="text-sm font-medium text-yellow-800">
                        Your store is not active yet. Subscribe to unlock your storefront.
                    </p>
                    <SubscribeButton />
                </div>
            )}

            {/* 1. Stats Calendar */}
            {myProfile?.subscription && myProfile?.id && (
                <StatsCalendar userId={myProfile.id} />
            )}

            {/* 2. Conversion Rate */}
            {myProfile?.subscription && (
                <div className="w-full bg-white border rounded-xl shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b bg-slate-50 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-slate-500" />
                            <h2 className="text-sm font-semibold text-slate-700">Conversion Rate</h2>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 ml-auto">
                            <div className="flex items-center gap-1.5">
                                <label className="text-xs text-slate-500 whitespace-nowrap">From</label>
                                <input type="date" value={convFrom} onChange={e => setConvFrom(e.target.value)}
                                    className="text-xs border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <label className="text-xs text-slate-500 whitespace-nowrap">To</label>
                                <input type="date" value={convTo} onChange={e => setConvTo(e.target.value)}
                                    className="text-xs border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300" />
                            </div>
                        </div>
                    </div>
                    {convLoading ? (
                        <div className="p-6 text-center text-sm text-slate-400">Loading...</div>
                    ) : (
                        <div className="flex divide-x">
                            <div className="flex-1 px-6 py-4 text-center">
                                <div className="text-2xl font-bold text-slate-800">{monthCheckouts}</div>
                                <div className="text-xs text-slate-500 mt-0.5">Checkouts</div>
                            </div>
                            <div className="flex-1 px-6 py-4 text-center">
                                <div className="text-2xl font-bold text-slate-800">{monthOrders}</div>
                                <div className="text-xs text-slate-500 mt-0.5">Orders</div>
                            </div>
                            <div className="flex-1 px-6 py-4 text-center">
                                <div className={`text-2xl font-bold ${conversionRate > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {conversionRate.toFixed(1)}%
                                </div>
                                <div className="text-xs text-slate-500 mt-0.5">Conversion</div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 3. My Images table */}
            {products.length > 0 && (
                <>
                    {/* Mobile cards */}
                    <div className="flex flex-col gap-4 md:hidden">
                        {products.map((product) => (
                            <div key={product.id} className="border rounded-xl p-4 bg-white shadow-sm space-y-3">
                                <div className="grid gap-2 grid-cols-2 lg:grid-cols-3">
                                    {slotsFor(product).map((i) => renderMediaCell(product, i, 'sm'))}
                                    {!slotsFor(product).some(i => product[`image${i}_url`]) && (
                                        <div className="w-18 h-18 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">no img</div>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <p className="font-semibold text-sm">{product.name}</p>
                                    {product.price != null && <p className="text-sm text-muted-foreground">${Number(product.price).toFixed(2)}</p>}
                                    {product.description && <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>}
                                </div>
                                <div className="flex items-start lg:items-center gap-3 lg:gap-0 flex-col lg:flex-row justify-between pt-1">
                                    {product.subscription ? (
                                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">&#10003; Connected</span>
                                    ) : (
                                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">&#10007; Not Connected</span>
                                    )}
                                    <div className="flex gap-2 items-center">
                                        {isActiveSubscriber(product) ? (
                                            <div className="flex items-center gap-x-1">
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-lg">
                                                    &#10003; Subscribed
                                                </span>
                                                <a href="/subscription/cancel" onClick={handleCancel}>
                                                    <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 text-xs">
                                                        Cancel Subscription
                                                    </Button>
                                                </a>
                                            </div>
                                        ) : (
                                            <a href="/subscribe">
                                                <Button size="sm" className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-semibold">
                                                    &#9889; Subscribe
                                                </Button>
                                            </a>
                                        )}
                                        <a href={`${editUrlBase}/${product.id}/edit`}><Button size="sm" variant="outline">Edit</Button></a>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Upgrade CTA — mobile */}
                        <div className="flex w-full justify-center">
                            <UpgradeToProButton
                                plan={myProfile?.plan ?? 'basic'}
                                hasSubscription={
                                    !!myProfile?.ls_subscription_id &&
                                    myProfile?.ls_status === 'active'
                                }
                            />
                        </div>
                    </div>

                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto rounded-lg border bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>My Images</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right w-56">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-1.5 w-60 xl:w-90">
                                                {slotsFor(product).map((i) => renderMediaCell(product, i, 'lg'))}
                                                {!slotsFor(product).some(i => product[`image${i}_url`]) && (
                                                    <div className="zzz bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">no img</div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{product.price != null ? `${product.currency === 'PHP' ? '\u20b1' : product.currency === 'EUR' ? '\u20ac' : product.currency === 'GBP' ? '\u00a3' : '$'}${Number(product.price).toFixed(2)}` : '\u2014'}</TableCell>
                                        <TableCell className="max-w-md truncate text-sm text-muted-foreground">{product.description || '\u2014'}</TableCell>

                                        <TableCell>

                                            {isActiveSubscriber(product) ? (
                                                    <div className="flex flex items-center gap-1">
                                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-1 py-2 rounded-lg whitespace-nowrap">
                                                            &#10003; Subscribed
                                                        </span>
                                                        <a href="/subscription/cancel" onClick={handleCancel}>
                                                            <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 whitespace-nowrap text-xs px-1 py-1.5">
                                                                Cancel Subscription
                                                            </Button>
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <a href="/subscribe">
                                                        <Button size="sm" className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-semibold whitespace-nowrap">
                                                            &#9889; Subscribe
                                                        </Button>
                                                    </a>
                                             )}

                                        </TableCell>

                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-between gap-2">

                                                {product.subscription
                                                ? <span className="text-green-600 font-medium">&#10003; Connected</span>
                                                : <span className="text-slate-400">&#10007; Not Connected</span>
                                            }

                                                <a href={`${editUrlBase}/${product.id}/edit`}>
                                                    <Button size="sm" variant="outline">Edit</Button>
                                                </a>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Upgrade CTA — desktop */}
                        <div className="flex w-full justify-center py-4">
                            <UpgradeToProButton
                                plan={myProfile?.plan ?? 'basic'}
                                hasSubscription={
                                    !!myProfile?.ls_subscription_id &&
                                    myProfile?.ls_status === 'active'
                                }
                            />
                        </div>
                    </div>
                </>
            )}

            {/* 4. Orders section */}
            {myProfile?.subscription && (
                <OrdersSection currency={myProfile?.currency ?? 'USD'} />
            )}

            {/* Empty state */}
            {products.length === 0 && (
                <div className="text-center py-12 text-muted-foreground border rounded-lg">
                    You haven't set up your store profile yet.
                </div>
            )}
        </>
    );
}
