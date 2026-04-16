import { useState, useEffect } from 'react';

interface DailyEvent {
    date: string;
    type: 'view' | 'checkout';
    count: number;
}

interface Stats {
    views: number;
    checkouts: number;
    daily: DailyEvent[];
    image_views?: Record<string, number>;
}

export default function StatsCalendar({ userId }: { userId: number }) {
    const [filter, setFilter] = useState<'today' | 'week' | 'month' | 'range'>('today');
    const [stats, setStats]   = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [rangeFrom, setRangeFrom] = useState('');
    const [rangeTo, setRangeTo]     = useState('');
    const [rangeApplied, setRangeApplied] = useState(false);
    const [monthOffset, setMonthOffset] = useState(0);

    const LARAVEL_API = 'https://www.shopmyday.store';

    const getTargetMonth = (offset: number) => {
        const now = new Date();
        const d = new Date(now.getFullYear(), now.getMonth() + offset, 1);
        return { year: d.getFullYear(), month: d.getMonth() };
    };

    const getMonthRange = (offset: number) => {
        const { year, month } = getTargetMonth(offset);
        const pad = (n: number) => String(n).padStart(2, '0');
        const from = `${year}-${pad(month + 1)}-01`;
        const lastDay = new Date(year, month + 1, 0).getDate();
        const to = `${year}-${pad(month + 1)}-${pad(lastDay)}`;
        return { from, to };
    };

    useEffect(() => {
        if (filter === 'range' && !rangeApplied) return;
        setLoading(true);

        let url: string;
        if (filter === 'range') {
            url = `${LARAVEL_API}/api/store-profile/${userId}/stats?filter=range&from=${rangeFrom}&to=${rangeTo}`;
        } else if (filter === 'month') {
            const { from, to } = getMonthRange(monthOffset);
            url = `${LARAVEL_API}/api/store-profile/${userId}/stats?filter=range&from=${from}&to=${to}`;
        } else {
            url = `${LARAVEL_API}/api/store-profile/${userId}/stats?filter=${filter}`;
        }

        fetch(url)
            .then(r => r.json())
            .then(data => { setStats(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [filter, userId, rangeApplied, monthOffset]);

    const handleFilterChange = (f: typeof filter) => {
        setFilter(f);
        if (f !== 'range') setRangeApplied(false);
        if (f !== 'month') setMonthOffset(0);
    };

    const now = new Date();
    const { year, month } = getTargetMonth(filter === 'month' ? monthOffset : 0);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay    = new Date(year, month, 1).getDay();
    const monthName   = new Date(year, month, 1).toLocaleString('default', { month: 'long', year: 'numeric' });

    const apiDataMap: Record<string, { views: number; checkouts: number }> = {};
    stats?.daily?.forEach(e => {
        let dateKey = e.date;
        if (typeof dateKey === 'string') {
            if (dateKey.includes('T')) dateKey = dateKey.split('T')[0];
            else if (dateKey.includes(' ')) dateKey = dateKey.split(' ')[0];
        }
        if (!apiDataMap[dateKey]) apiDataMap[dateKey] = { views: 0, checkouts: 0 };
        if (e.type === 'view')     apiDataMap[dateKey].views     += e.count;
        if (e.type === 'checkout') apiDataMap[dateKey].checkouts += e.count;
    });

    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const data = apiDataMap[dateStr] || { views: 0, checkouts: 0 };
        const isToday = dateStr === now.toISOString().split('T')[0];
        const hasData = data.views > 0 || data.checkouts > 0;
        const dayOfWeek = new Date(year, month, day).getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        return { day, dateStr, data, isToday, hasData, isWeekend };
    });

    return (
        <div className="w-full bg-white border rounded-xl p-4 shadow-sm">
            <div className="flex flex-col gap-3 mb-4 items-center">
                <div className="flex gap-2">
                    {(['today', 'week', 'month', 'range'] as const).map(f => (
                        <button key={f} onClick={() => handleFilterChange(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === f ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {filter === 'range' && (
                    <div className="flex flex-wrap items-center gap-2 justify-center">
                        <div className="flex items-center gap-1.5">
                            <label className="text-xs text-slate-500">From</label>
                            <input type="date" value={rangeFrom} onChange={e => { setRangeFrom(e.target.value); setRangeApplied(false); }}
                                className="text-xs border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300" />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <label className="text-xs text-slate-500">To</label>
                            <input type="date" value={rangeTo} onChange={e => { setRangeTo(e.target.value); setRangeApplied(false); }}
                                className="text-xs border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300" />
                        </div>
                        <button onClick={() => { if (rangeFrom && rangeTo) setRangeApplied(true); }} disabled={!rangeFrom || !rangeTo}
                            className="px-3 py-1 text-xs bg-slate-800 text-white rounded-full disabled:opacity-40 hover:bg-slate-700 transition-colors">Apply</button>
                    </div>
                )}
            </div>

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

            {filter === 'range' && rangeApplied && !loading && stats?.daily && stats.daily.length > 0 && (() => {
                const grouped = stats.daily.reduce<Record<string, { views: number; checkouts: number }>>((acc, e) => {
                    let d = e.date;
                    if (d.includes('T')) d = d.split('T')[0];
                    else if (d.includes(' ')) d = d.split(' ')[0];
                    if (!acc[d]) acc[d] = { views: 0, checkouts: 0 };
                    if (e.type === 'view')     acc[d].views     += e.count;
                    if (e.type === 'checkout') acc[d].checkouts += e.count;
                    return acc;
                }, {});

                const sorted    = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
                const firstDate = sorted[0]?.[0];
                const lastDate  = sorted[sorted.length - 1]?.[0];
                if (!firstDate || !lastDate) return null;

                const allDays: string[] = [];
                const cursor = new Date(firstDate + 'T00:00:00');
                const end    = new Date(lastDate  + 'T00:00:00');
                while (cursor <= end) {
                    allDays.push(cursor.toISOString().split('T')[0]);
                    cursor.setDate(cursor.getDate() + 1);
                }

                const firstDayOfWeek = new Date(firstDate + 'T00:00:00').getDay();
                const today = now.toISOString().split('T')[0];

                return (
                    <div className="mt-2">
                        <div className="grid grid-cols-7 gap-1 text-center">
                            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                                <div key={d} className="text-xs text-slate-400 font-medium py-1">{d}</div>
                            ))}
                            {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`empty-${i}`} />)}
                            {allDays.map((dateStr) => {
                                const data = grouped[dateStr] || { views: 0, checkouts: 0 };
                                const hasData = data.views > 0 || data.checkouts > 0;
                                const isToday = dateStr === today;
                                const dow = new Date(dateStr + 'T00:00:00').getDay();
                                const isWeekend = dow === 0 || dow === 6;
                                const day = parseInt(dateStr.split('-')[2]);
                                return (
                                    <div key={dateStr}
                                        title={hasData ? `Views: ${data.views}, Checkouts: ${data.checkouts}` : `No activity on ${dateStr}`}
                                        className={`relative rounded-lg p-1 text-xs cursor-default transition-colors min-h-[2.5rem] flex flex-col items-center justify-center ${
                                            isToday ? 'bg-slate-800 text-white font-bold'
                                            : hasData ? 'bg-green-50 text-green-800'
                                            : isWeekend ? 'bg-slate-50 text-slate-400'
                                            : 'text-slate-500'
                                        }`}>
                                        <div className={isWeekend && !hasData && !isToday ? 'text-slate-400' : ''}>{day}</div>
                                        {data.views > 0 && <div className="text-[9px] leading-tight text-blue-500 font-medium">{data.views}v</div>}
                                        {data.checkouts > 0 && <div className="text-[9px] leading-tight text-orange-500 font-medium">{data.checkouts}c</div>}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex gap-4 justify-center mt-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><span className="text-blue-500 font-bold">v</span> = views</span>
                            <span className="flex items-center gap-1"><span className="text-orange-500 font-bold">c</span> = checkouts</span>
                        </div>
                    </div>
                );
            })()}

            {filter === 'range' && rangeApplied && !loading && (!stats?.daily || stats.daily.length === 0) && (
                <div className="text-center text-xs text-slate-400 py-4">No activity for the selected range.</div>
            )}

            {filter === 'month' && (
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <button onClick={() => setMonthOffset(o => o - 1)}
                            className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">← Prev</button>
                        <h3 className="text-sm font-semibold text-slate-600">{monthName}</h3>
                        <button onClick={() => setMonthOffset(o => o + 1)} disabled={monthOffset >= 0}
                            className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">Next →</button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                            <div key={d} className="text-xs text-slate-400 font-medium py-1">{d}</div>
                        ))}
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                        {calendarDays.map(({ day, dateStr, data, isToday, hasData, isWeekend }) => (
                            <div key={day}
                                title={hasData ? `Views: ${data.views}, Checkouts: ${data.checkouts}` : `No activity on ${dateStr}`}
                                className={`relative rounded-lg p-1 text-xs cursor-default transition-colors min-h-[2.5rem] flex flex-col items-center justify-center ${
                                    isToday ? 'bg-slate-800 text-white font-bold'
                                    : hasData ? 'bg-green-50 text-green-800'
                                    : isWeekend ? 'bg-slate-50 text-slate-400'
                                    : 'text-slate-500'
                                }`}>
                                <div className={isWeekend && !hasData && !isToday ? 'text-slate-400' : ''}>{day}</div>
                                {data.views > 0 && <div className="text-[9px] leading-tight text-blue-500 font-medium">{data.views}v</div>}
                                {data.checkouts > 0 && <div className="text-[9px] leading-tight text-orange-500 font-medium">{data.checkouts}c</div>}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4 justify-center mt-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><span className="text-blue-500 font-bold">v</span> = views</span>
                        <span className="flex items-center gap-1"><span className="text-orange-500 font-bold">c</span> = checkouts</span>
                    </div>
                </div>
            )}
        </div>
    );
}
