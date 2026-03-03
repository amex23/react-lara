import { Button } from '@/components/ui/button';
import { Head, usePage, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Megaphone, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Product {
    id: number;
    name: string;
    user_id: number;
    owner_name?: string;
    description?: string | null;
    price?: string | number | null;
    subscription?: boolean;
    profile_views?: number;
    profile_checkouts?: number;
    image1_url?: string | null;
    image2_url?: string | null;
    image3_url?: string | null;
    image4_url?: string | null;
    image5_url?: string | null;
    image6_url?: string | null;
}

interface PageProps {
    products: Product[];
    authUser: { id: number; user_type: 'admin' | 'user'; name: string };
    flash?: { message?: string };
    createUrl: string;
    editUrlBase: string;
}

interface DailyEvent {
    date: string;
    type: 'view' | 'checkout';
    count: number;
}

interface Stats {
    views: number;
    checkouts: number;
    daily: DailyEvent[];
}

function DeleteButton({ url, name }: { url: string; name: string }) {
    const { processing, delete: destroy } = useForm({});
    const handle = () => {
        if (confirm(`Clear the store profile for "${name}"? The account will remain but all profile data will be removed.`)) {
            destroy(url);
        }
    };
    return (
        <Button size="sm" variant="destructive" disabled={processing} onClick={handle}>
            Clear
        </Button>
    );
}

// ── Calendar + Stats Widget ───────────────────────────────────────────────
function StatsCalendar({ userId }: { userId: number }) {
    const [filter, setFilter] = useState<'today' | 'week' | 'month'>('today');
    const [stats, setStats]   = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    // const LARAVEL_API = 'https://react-lara-master-vibaxb.laravel.cloud';
    const LARAVEL_API = 'https://www.shopmyday.store';

    useEffect(() => {
        setLoading(true);
        fetch(`${LARAVEL_API}/api/store-profile/${userId}/stats?filter=${filter}`)
            .then(r => r.json())
            .then(data => { setStats(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [filter, userId]);

    // Build calendar days for current month
    const now        = new Date();
    const year       = now.getFullYear();
    const month      = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay   = new Date(year, month, 1).getDay();
    const monthName  = now.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Map daily data
    const dailyMap: Record<string, { views: number; checkouts: number }> = {};
    stats?.daily?.forEach(e => {
        if (!dailyMap[e.date]) dailyMap[e.date] = { views: 0, checkouts: 0 };
        if (e.type === 'view')     dailyMap[e.date].views     += e.count;
        if (e.type === 'checkout') dailyMap[e.date].checkouts += e.count;
    });

    const today = now.toISOString().split('T')[0];

    return (
        <div className="w-full bg-white border rounded-xl p-4 shadow-sm">

            {/* Filter tabs */}
            <div className="flex gap-2 mb-4 justify-center">
                {(['today', 'week', 'month'] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            filter === f
                                ? 'bg-slate-800 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Stats summary */}
            <div className="flex justify-around mb-4 p-3 bg-slate-50 rounded-lg">
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">
                        {loading ? '—' : stats?.views ?? 0}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">Views</div>
                </div>
                <div className="w-px bg-slate-200" />
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">
                        {loading ? '—' : stats?.checkouts ?? 0}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">Checkouts</div>
                </div>
            </div>

            {/* Calendar — only shown on month view */}
            {filter === 'month' && (
                <div>
                    <h3 className="text-sm font-semibold text-center text-slate-600 mb-3">{monthName}</h3>
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                            <div key={d} className="text-xs text-slate-400 font-medium py-1">{d}</div>
                        ))}

                        {/* Empty cells for first day offset */}
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} />
                        ))}

                        {/* Day cells */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day     = i + 1;
                            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const data    = dailyMap[dateStr];
                            const isToday = dateStr === today;
                            const hasData = !!data;

                            return (
                                <div
                                    key={day}
                                    title={data ? `Views: ${data.views}, Checkouts: ${data.checkouts}` : ''}
                                    className={`relative rounded-lg p-1 text-xs cursor-default transition-colors ${
                                        isToday
                                            ? 'bg-slate-800 text-white font-bold'
                                            : hasData
                                            ? 'bg-green-50 text-green-800'
                                            : 'text-slate-500'
                                    }`}
                                >
                                    <div>{day}</div>
                                    {data?.views ? (
                                        <div className="text-[9px] leading-tight text-blue-500">{data.views}v</div>
                                    ) : null}
                                    {data?.checkouts ? (
                                        <div className="text-[9px] leading-tight text-orange-500">{data.checkouts}c</div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="flex gap-4 justify-center mt-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><span className="text-blue-500 font-bold">v</span> = views</span>
                        <span className="flex items-center gap-1"><span className="text-orange-500 font-bold">c</span> = checkouts</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Index() {
    const { products, authUser, flash, createUrl, editUrlBase } = usePage<PageProps>().props;

    const isAdmin = authUser.user_type === 'admin';

    const userAlreadyHasProfile =
        !isAdmin &&
        products.some(
            (p) =>
                p.user_id === authUser.id &&
                (p.description || p.image1_url || p.price != null),
        );

    const myProfile = !isAdmin ? products[0] : null;

    return (
        <AppLayout breadcrumbs={[{
            title: isAdmin ? 'Products' : 'Dashboard',
            href: isAdmin ? route('products.index') : '/dashboard',
        }]}>
            <Head title={isAdmin ? 'All Store Profiles' : 'My Store Profile'} />

            <div className="w-full max-w-7xl mx-auto py-6 px-4 lg:px-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-7 mb-6">
                    <div className='w-full flex justify-center flex-col gap-y-5'>
                        <h1 className="text-3xl text-center font-bold">
                            {isAdmin ? 'All Store Profiles' : 'My Store Profile'}
                        </h1>

                        {!isAdmin && !myProfile?.subscription && (
                            <div className="mb-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 text-center">
                                Your store is not connected to Shopify. Contact your admin to activate.
                            </div>
                        )}

                        {/* Stats Calendar — only for connected users */}
                        {!isAdmin && myProfile?.subscription && myProfile?.id && (
                            <StatsCalendar userId={myProfile.id} />
                        )}
                    </div>

                    {isAdmin ? (
                        <a href={route('register.admin')}>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                New User / Profile
                            </Button>
                        </a>
                    ) : !userAlreadyHasProfile ? (
                        <a href={createUrl}>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Set Up My Store
                            </Button>
                        </a>
                    ) : null}
                </div>

                {flash?.message && (
                    <Alert className="mb-6">
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}

                {products.length === 0 ? (
    <div className="text-center py-12 text-muted-foreground border rounded-lg">
        {isAdmin
            ? 'No store profiles have been created yet.'
            : "You haven't set up your store profile yet."}
    </div>
) : (
    <>
        {/* Mobile card view */}
        <div className="flex flex-col gap-4 md:hidden">
            {products.map((product) => (
                <div key={product.id} className="border rounded-xl p-4 bg-white shadow-sm space-y-3">
                    {isAdmin && (
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>ID: {product.id}</span>
                            <span>{product.owner_name || `User #${product.user_id}`}</span>
                        </div>
                    )}

                    {/* Images row */}
                    <div className="flex gap-1.5 flex-wrap">
                        {[1,2,3,4,5,6].map((i) => {
                            const key = `image${i}_url` as keyof Product;
                            return product[key] ? (
                                <img
                                    key={i}
                                    src={product[key] as string}
                                    alt={`Image ${i}`}
                                    className="w-10 h-10 object-cover rounded border shadow-sm"
                                />
                            ) : null;
                        })}
                        {![1,2,3,4,5,6].some(i => product[`image${i}_url` as keyof Product]) && (
                            <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                                no img
                            </div>
                        )}
                    </div>

                    <div className="space-y-1">
                        <p className="font-semibold text-sm">{product.name}</p>
                        {product.price != null && (
                            <p className="text-sm text-muted-foreground">${Number(product.price).toFixed(2)}</p>
                        )}
                        {product.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        {product.subscription ? (
                            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">✓ Connected</span>
                        ) : (
                            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">✗ Not Connected</span>
                        )}
                        <div className="flex gap-2">
                            <a href={`${editUrlBase}/${product.id}/edit`}>
                                <Button size="sm" variant="outline">Edit</Button>
                            </a>
                            {isAdmin && (
                                <DeleteButton url={`${editUrlBase}/${product.id}`} name={product.name} />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Desktop table view */}
        <div className="hidden md:block overflow-x-auto rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {isAdmin && <TableHead className="w-16">ID</TableHead>}
                        {isAdmin && <TableHead className="w-44">Owner</TableHead>}
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
                            {isAdmin && <TableCell className="font-medium">{product.id}</TableCell>}
                            {isAdmin && (
                                <TableCell className="text-sm">
                                    {product.owner_name || `User #${product.user_id}`}
                                </TableCell>
                            )}
                            <TableCell>
                                <div className="flex gap-1.5 flex-wrap max-w-[140px]">
                                    {[1,2,3,4,5,6].map((i) => {
                                        const key = `image${i}_url` as keyof Product;
                                        return product[key] ? (
                                            <img key={i} src={product[key] as string} alt={`Image ${i}`}
                                                className="w-10 h-10 object-cover rounded border shadow-sm" />
                                        ) : null;
                                    })}
                                    {![1,2,3,4,5,6].some(i => product[`image${i}_url` as keyof Product]) && (
                                        <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">no img</div>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.price != null ? `$${Number(product.price).toFixed(2)}` : '—'}</TableCell>
                            <TableCell className="max-w-md truncate text-sm text-muted-foreground">{product.description || '—'}</TableCell>
                            <TableCell>
                                {product.subscription ? (
                                    <span className="text-green-600 font-medium">✓ Connected</span>
                                ) : (
                                    <span className="text-slate-400">✗ Not Connected</span>
                                )}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <a href={`${editUrlBase}/${product.id}/edit`}>
                                    <Button size="sm" variant="outline">Edit</Button>
                                </a>
                                {isAdmin && <DeleteButton url={`${editUrlBase}/${product.id}`} name={product.name} />}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </>
)}
            </div>
        </AppLayout>
    );
}

