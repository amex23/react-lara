import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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

interface Product {
    id: number;
    name: string;
    user_id: number;
    owner_name?: string;
    description?: string | null;
    price?: string | number | null;
    subscription?: boolean;
    image1_url?: string | null;
    image2_url?: string | null;
    image3_url?: string | null;
    image4_url?: string | null;
    image5_url?: string | null;
    image6_url?: string | null;
}

interface UserViewProps {
    products: Product[];
    myProfile: Product | null;
    editUrlBase: string;
}

export default function UserView({ products, myProfile, editUrlBase }: UserViewProps) {
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

    return (
        <>
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
                                <div className="flex gap-1.5 flex-wrap">
                                    {[1,2,3,4,5,6].map((i) => {
                                        const key = `image${i}_url` as keyof Product;
                                        const viewCount = imageViews[String(i)] ?? 0;
                                        return product[key] ? (
                                            <ImageWithBadge key={i} src={product[key] as string} alt={`Image ${i}`} viewCount={viewCount} size="sm" />
                                        ) : null;
                                    })}
                                    {![1,2,3,4,5,6].some(i => product[`image${i}_url` as keyof Product]) && (
                                        <div className="w-18 h-18 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">no img</div>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <p className="font-semibold text-sm">{product.name}</p>
                                    {product.price != null && <p className="text-sm text-muted-foreground">${Number(product.price).toFixed(2)}</p>}
                                    {product.description && <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>}
                                </div>
                                <div className="flex items-center justify-between pt-1">
                                    {product.subscription ? (
                                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">✓ Connected</span>
                                    ) : (
                                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">✗ Not Connected</span>
                                    )}
                                    <a href={`${editUrlBase}/${product.id}/edit`}><Button size="sm" variant="outline">Edit</Button></a>
                                </div>
                            </div>
                        ))}
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
                                    <TableHead className="text-right w-36">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <div className="flex gap-1.5 flex-wrap">
                                                {[1,2,3,4,5,6].map((i) => {
                                                    const key = `image${i}_url` as keyof Product;
                                                    const viewCount = imageViews[String(i)] ?? 0;
                                                    return product[key] ? (
                                                        <ImageWithBadge key={i} src={product[key] as string} alt={`Image ${i}`} viewCount={viewCount} size="lg" />
                                                    ) : null;
                                                })}
                                                {![1,2,3,4,5,6].some(i => product[`image${i}_url` as keyof Product]) && (
                                                    <div className="w-16 h-16 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">no img</div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{product.price != null ? `$${Number(product.price).toFixed(2)}` : '—'}</TableCell>
                                        <TableCell className="max-w-md truncate text-sm text-muted-foreground">{product.description || '—'}</TableCell>
                                        <TableCell>{product.subscription ? <span className="text-green-600 font-medium">✓ Connected</span> : <span className="text-slate-400">✗ Not Connected</span>}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <a href={`${editUrlBase}/${product.id}/edit`}><Button size="sm" variant="outline">Edit</Button></a>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}

            {/* 4. Orders section */}
            {myProfile?.subscription && (
                <OrdersSection />
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
