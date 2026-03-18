import { Button } from '@/components/ui/button';
import { Head, usePage, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Megaphone, Plus } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
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
    const [filter, setFilter] = useState<'today' | 'week' | 'month' | 'range'>('today');
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    const todayStr = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(todayStr);
    const [endDate, setEndDate] = useState(todayStr);
    const [selecting, setSelecting] = useState<'start' | 'end'>('start');

    // Dynamic API Base ensures this works on both staging and main domains
    const API_BASE = typeof window !== 'undefined' ? window.location.origin : '';

    useEffect(() => {
        setLoading(true);
        let url = `${API_BASE}/api/store-profile/${userId}/stats?filter=${filter}`;
        
        if (filter === 'range') {
            url += `&startDate=${startDate}&endDate=${endDate}`;
        }

        fetch(url)
            .then(r => r.json())
            .then(data => { setStats(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [filter, userId, startDate, endDate, API_BASE]);

    const calendarMeta = useMemo(() => {
        // Fallback to today if range dates are invalid
        const baseDate = filter === 'range' && startDate ? new Date(startDate) : new Date();
        const year = baseDate.getFullYear();
        const month = baseDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const monthName = baseDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        const dailyMap: Record<string, { views: number; checkouts: number }> = {};
        stats?.daily?.forEach(e => {
            if (!dailyMap[e.date]) dailyMap[e.date] = { views: 0, checkouts: 0 };
            if (e.type === 'view')     dailyMap[e.date].views     += e.count;
            if (e.type === 'checkout') dailyMap[e.date].checkouts += e.count;
        });

        return { year, month, daysInMonth, firstDay, monthName, dailyMap };
    }, [stats, startDate, filter]);

    const handleDayClick = (dateStr: string) => {
        if (filter !== 'range') return;

        if (selecting === 'start') {
            setStartDate(dateStr);
            setSelecting('end');
        } else {
            if (new Date(dateStr) < new Date(startDate)) {
                setStartDate(dateStr);
            } else {
                setEndDate(dateStr);
                setSelecting('start');
            }
        }
    };

    return (
        <div className="w-full bg-white border rounded-xl p-4 shadow-sm">
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {(['today', 'week', 'month', 'range'] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => {
                            setFilter(f);
                            if (f === 'range') setSelecting('start');
                        }}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            filter === f ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {filter === 'range' && (
                <div className="flex flex-col gap-2 mb-4 items-center">
                    <div className="flex flex-wrap gap-3 justify-center items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className={`flex items-center gap-2 p-1 rounded ${selecting === 'start' ? 'ring-2 ring-blue-400 bg-white' : ''}`}>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">From:</span>
                            <input type="date" className="text-xs border-none bg-transparent p-0 focus:ring-0" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className={`flex items-center gap-2 p-1 rounded ${selecting === 'end' ? 'ring-2 ring-blue-400 bg-white' : ''}`}>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">To:</span>
                            <input type="date" className="text-xs border-none bg-transparent p-0 focus:ring-0" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-400 italic">Select start and end dates on the calendar</p>
                </div>
            )}

            <div className="flex justify-around mb-4 p-3 bg-slate-50 rounded-lg">
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">{loading ? '—' : stats?.views ?? 0}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Views</div>
                </div>
                <div className="w-px bg-slate-200" />
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">{loading ? '—' : stats?.checkouts ?? 0}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Checkouts</div>
                </div>
            </div>

            {(filter === 'month' || filter === 'range') && (
                <div>
                    <h3 className="text-sm font-semibold text-center text-slate-600 mb-3">{calendarMeta.monthName}</h3>
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                            <div key={d} className="text-xs text-slate-400 font-medium py-1">{d}</div>
                        ))}
                        {Array.from({ length: calendarMeta.firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                        {Array.from({ length: calendarMeta.daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const dateStr = `${calendarMeta.year}-${String(calendarMeta.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const data = calendarMeta.dailyMap[dateStr];
                            const isToday = dateStr === todayStr;
                            const isSelected = filter === 'range' && (dateStr === startDate || dateStr === endDate);
                            const isInRange = filter === 'range' && (dateStr > startDate && dateStr < endDate);

                            return (
                                <div 
                                    key={day} 
                                    onClick={() => handleDayClick(dateStr)}
                                    className={`relative rounded-lg p-1 text-xs min-h-[40px] transition-all cursor-pointer ${
                                        isSelected ? 'bg-blue-600 text-white font-bold scale-105 z-10 shadow-md' :
                                        isInRange ? 'bg-blue-50 text-blue-800' :
                                        isToday ? 'bg-slate-800 text-white font-bold' :
                                        data ? 'bg-green-50 text-green-800 border border-green-100' : 
                                        'text-slate-500 hover:bg-slate-100'
                                    }`}
                                >
                                    <div>{day}</div>
                                    {data?.views && <div className={`text-[9px] ${isSelected || isToday ? 'text-blue-200' : 'text-blue-500'}`}>{data.views}v</div>}
                                    {data?.checkouts && <div className={`text-[9px] ${isSelected || isToday ? 'text-orange-200' : 'text-orange-500'}`}>{data.checkouts}c</div>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Index() {
    const { products, authUser, flash, createUrl, editUrlBase } = usePage<PageProps>().props;
    const isAdmin = authUser.user_type === 'admin';
    const myProfile = !isAdmin ? products[0] : null;

    return (
        <AppLayout breadcrumbs={[{ title: isAdmin ? 'Products' : 'Dashboard', href: isAdmin ? route('products.index') : '/dashboard' }]}>
            <Head title={isAdmin ? 'All Store Profiles' : 'My Store Profile'} />
            <div className="w-full max-w-7xl mx-auto py-6 px-4 lg:px-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-7 mb-6">
                    <div className='w-full flex justify-center flex-col gap-y-5'>
                        <h1 className="text-3xl text-center font-bold">{isAdmin ? 'All Store Profiles' : 'My Store Profile'}</h1>
                        {!isAdmin && myProfile?.subscription && myProfile?.id && <StatsCalendar userId={myProfile.id} />}
                    </div>
                    {isAdmin ? (
                        <a href={route('register.admin')}><Button><Plus className="mr-2 h-4 w-4" />New User</Button></a>
                    ) : !products.length ? (
                        <a href={createUrl}><Button><Plus className="mr-2 h-4 w-4" />Set Up My Store</Button></a>
                    ) : null}
                </div>

                <div className="hidden md:block overflow-x-auto rounded-lg border bg-white shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {isAdmin && <TableHead>Owner</TableHead>}
                                <TableHead>My Images</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    {isAdmin && <TableCell>{product.owner_name}</TableCell>}
                                    <TableCell>
                                        <div className="flex gap-1.5 flex-wrap max-w-[140px]">
                                            {[1,2,3,4,5,6].map(i => {
                                                const key = `image${i}_url` as keyof Product;
                                                return product[key] && <img key={i} src={product[key] as string} className="w-10 h-10 object-cover rounded border shadow-sm" />;
                                            })}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.price != null ? `$${Number(product.price).toFixed(2)}` : '—'}</TableCell>
                                    <TableCell>{product.subscription ? <span className="text-green-600 font-medium">✓ Connected</span> : <span className="text-slate-400">✗ Not Connected</span>}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <a href={`${editUrlBase}/${product.id}/edit`}><Button size="sm" variant="outline">Edit</Button></a>
                                        {isAdmin && <DeleteButton url={`${editUrlBase}/${product.id}`} name={product.name} />}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}