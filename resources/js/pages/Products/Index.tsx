import { Button } from '@/components/ui/button';
import { Head, usePage, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { route } from 'ziggy-js';
import { Plus } from 'lucide-react';
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

function StatsCalendar({ userId }: { userId: number }) {
    const [filter, setFilter] = useState<'today' | 'week' | 'month' | 'range'>('today');
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    const todayStr = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(todayStr);
    const [endDate, setEndDate] = useState(todayStr);
    const [selecting, setSelecting] = useState<'start' | 'end'>('start');

    const API_BASE = typeof window !== 'undefined' ? window.location.origin : '';

    useEffect(() => {
        setLoading(true);
        let url = `${API_BASE}/api/store-profile/${userId}/stats?filter=${filter}`;
        
        if (filter === 'range') {
            url += `&startDate=${startDate}&endDate=${endDate}`;
        }

        fetch(url)
            .then(r => r.json())
            .then(data => { 
                setStats(data); 
                setLoading(false); 
            })
            .catch(() => setLoading(false));
    }, [filter, userId, startDate, endDate, API_BASE]);

    const calendarMeta = useMemo(() => {
        const baseDate = filter === 'range' ? new Date(startDate) : new Date();
        const year = baseDate.getFullYear();
        const month = baseDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const monthName = baseDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        const dailyMap: Record<string, { views: number; checkouts: number }> = {};
        
        // FORCED CALCULATION: We ignore stats.views and manually sum the daily data
        let totalViews = 0;
        let totalCheckouts = 0;

        if (stats?.daily) {
            stats.daily.forEach(e => {
                const date = e.date;
                if (!dailyMap[date]) dailyMap[date] = { views: 0, checkouts: 0 };
                
                if (e.type === 'view') {
                    dailyMap[date].views += e.count;
                    totalViews += e.count;
                } else if (e.type === 'checkout') {
                    dailyMap[date].checkouts += e.count;
                    totalCheckouts += e.count;
                }
            });
        }

        return { 
            year, month, daysInMonth, firstDay, monthName, dailyMap,
            displayViews: totalViews,
            displayCheckouts: totalCheckouts
        };
    }, [stats, startDate, filter]);

    const handleDayClick = (dateStr: string) => {
        if (filter !== 'range') return;
        if (selecting === 'start') {
            setStartDate(dateStr);
            setEndDate(dateStr); 
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
        <div className="w-full bg-white border rounded-xl p-4 shadow-sm max-w-md mx-auto">
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {(['today', 'week', 'month', 'range'] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => {
                            setFilter(f);
                            if (f === 'range') {
                                setSelecting('start');
                                const weekAgo = new Date();
                                weekAgo.setDate(weekAgo.getDate() - 7);
                                setStartDate(weekAgo.toISOString().split('T')[0]);
                                setEndDate(todayStr);
                            }
                        }}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            filter === f ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {filter === 'range' && (
                <div className="flex flex-col gap-2 mb-4 items-center animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex gap-2 justify-center items-center p-2 bg-slate-50 rounded-lg border border-slate-200">
                        <div className={`flex flex-col p-1 px-2 rounded cursor-pointer ${selecting === 'start' ? 'ring-2 ring-blue-500 bg-white' : ''}`} onClick={() => setSelecting('start')}>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">From</span>
                            <span className="text-xs font-medium">{startDate}</span>
                        </div>
                        <div className="text-slate-300">→</div>
                        <div className={`flex flex-col p-1 px-2 rounded cursor-pointer ${selecting === 'end' ? 'ring-2 ring-blue-500 bg-white' : ''}`} onClick={() => setSelecting('end')}>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">To</span>
                            <span className="text-xs font-medium">{endDate}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-around mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-center">
                    <div className="text-3xl font-extrabold text-slate-900 leading-none">
                        {loading ? '...' : calendarMeta.displayViews}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">Views</div>
                </div>
                <div className="w-px bg-slate-200 h-10 self-center" />
                <div className="text-center">
                    <div className="text-3xl font-extrabold text-slate-900 leading-none">
                        {loading ? '...' : calendarMeta.displayCheckouts}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">Checkouts</div>
                </div>
            </div>

            {(filter === 'month' || filter === 'range') && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <h3 className="text-xs font-bold text-center text-slate-400 uppercase tracking-widest mb-4">{calendarMeta.monthName}</h3>
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {['S','M','T','W','T','F','S'].map(d => (
                            <div key={d} className="text-[10px] text-slate-300 font-bold py-1">{d}</div>
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
                                    className={`relative rounded-lg p-1 text-xs min-h-[44px] transition-all cursor-pointer flex flex-col items-center justify-start border ${
                                        isSelected ? 'bg-blue-600 border-blue-700 text-white font-bold z-10 shadow-md' :
                                        isInRange ? 'bg-blue-50 border-blue-100 text-blue-800' :
                                        isToday ? 'border-slate-900 border-2 text-slate-900 font-bold' :
                                        data ? 'bg-green-50 text-green-800 border-green-100' : 
                                        'text-slate-500 border-transparent hover:bg-slate-50'
                                    }`}
                                >
                                    <span className="mb-0.5">{day}</span>
                                    {data?.views > 0 && <span className={`text-[8px] font-medium leading-none ${isSelected ? 'text-blue-100' : 'text-blue-500'}`}>{data.views}v</span>}
                                    {data?.checkouts > 0 && <span className={`text-[8px] font-medium leading-none ${isSelected ? 'text-orange-100' : 'text-orange-500'}`}>{data.checkouts}c</span>}
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
    const { products, authUser, createUrl, editUrlBase } = usePage<PageProps>().props;
    const isAdmin = authUser.user_type === 'admin';
    const myProfile = !isAdmin ? products[0] : null;

    return (
        <AppLayout breadcrumbs={[{ title: isAdmin ? 'Products' : 'Dashboard', href: isAdmin ? route('products.index') : '/dashboard' }]}>
            <Head title={isAdmin ? 'All Store Profiles' : 'My Store Profile'} />
            <div className="w-full max-w-7xl mx-auto py-6 px-4 lg:px-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-7 mb-10">
                    <div className='w-full flex justify-center flex-col gap-y-6'>
                        <h1 className="text-3xl text-center font-extrabold tracking-tight text-slate-900">
                            {isAdmin ? 'All Store Profiles' : 'My Store Profile'}
                        </h1>
                        {!isAdmin && myProfile?.subscription && myProfile?.id && <StatsCalendar userId={myProfile.id} />}
                    </div>
                    {isAdmin ? (
                        <a href={route('register.admin')}><Button className="shadow-sm"><Plus className="mr-2 h-4 w-4" />New User</Button></a>
                    ) : !products.length ? (
                        <a href={createUrl}><Button className="shadow-sm"><Plus className="mr-2 h-4 w-4" />Set Up My Store</Button></a>
                    ) : null}
                </div>

                <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                {isAdmin && <TableHead className="font-bold text-slate-700">Owner</TableHead>}
                                <TableHead className="font-bold text-slate-700">Images</TableHead>
                                <TableHead className="font-bold text-slate-700">Name</TableHead>
                                <TableHead className="font-bold text-slate-700">Price</TableHead>
                                <TableHead className="font-bold text-slate-700">Status</TableHead>
                                <TableHead className="text-right font-bold text-slate-700">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id} className="hover:bg-slate-50/50">
                                    {isAdmin && <TableCell className="font-medium">{product.owner_name}</TableCell>}
                                    <TableCell>
                                        <div className="flex gap-2 flex-wrap max-w-[140px]">
                                            {[1,2,3,4,5,6].map(i => {
                                                const key = `image${i}_url` as keyof Product;
                                                return product[key] && <img key={i} src={product[key] as string} className="w-10 h-10 object-cover rounded-md border border-slate-200 shadow-sm" />;
                                            })}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-semibold text-slate-900">{product.name}</TableCell>
                                    <TableCell className="text-slate-600">{product.price != null ? `$${Number(product.price).toFixed(2)}` : '—'}</TableCell>
                                    <TableCell>
                                        {product.subscription ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-100 uppercase tracking-wider">Connected</span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-slate-50 text-slate-400 border border-slate-100 uppercase tracking-wider">Inactive</span>
                                        )}
                                    </TableCell>
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