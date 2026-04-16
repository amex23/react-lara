import { useState, useEffect } from 'react';
import { Globe, MapPin, Wifi, Clock } from 'lucide-react';

interface VisitorEntry {
    id: number;
    ip: string;
    country: string | null;
    region: string | null;
    city: string | null;
    isp: string | null;
    lat: number | null;
    lon: number | null;
    timezone: string | null;
    url: string | null;
    precise_lat: number | null;
    precise_lon: number | null;
    precise_accuracy: number | null;
    created_at: string;
}

export default function VisitorLog() {
    const [logs, setLogs]       = useState<VisitorEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage]       = useState(1);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo]     = useState('');
    const PER_PAGE = 30;

    useEffect(() => {
        setLoading(true);
        fetch('/api/visitor-logs', { headers: { 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' })
            .then(r => r.json()).then(data => { setLogs(data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    useEffect(() => { setPage(1); }, [dateFrom, dateTo]);

    const filtered = logs.filter(log => {
        const logDate = new Date(log.created_at);
        if (dateFrom && logDate < new Date(dateFrom + 'T00:00:00')) return false;
        if (dateTo   && logDate > new Date(dateTo   + 'T23:59:59')) return false;
        return true;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <div className="w-full bg-white border rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="px-4 py-3 border-b bg-slate-50 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-500" />
                    <h2 className="text-sm font-semibold text-slate-700">Recent Visitors</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 ml-auto">
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs text-slate-500 whitespace-nowrap">From</label>
                        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="text-xs border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs text-slate-500 whitespace-nowrap">To</label>
                        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="text-xs border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300" />
                    </div>
                    {(dateFrom || dateTo) && <button onClick={() => { setDateFrom(''); setDateTo(''); }} className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded-md hover:bg-red-50 transition-colors">Clear</button>}
                    <span className="text-xs text-slate-400 whitespace-nowrap">{filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}</span>
                </div>
            </div>

            {loading ? <div className="p-6 text-center text-sm text-slate-400">Loading...</div>
            : filtered.length === 0 ? <div className="p-6 text-center text-sm text-slate-400">{dateFrom || dateTo ? 'No visitors found for the selected date range.' : 'No visitors logged yet.'}</div>
            : (
                <>
                    <div className="flex flex-col divide-y md:hidden">
                        {paginated.map((log) => (
                            <div key={log.id} className="p-4 space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs font-semibold text-slate-700">{log.ip}</span>
                                    <span className="text-xs text-slate-400">{new Date(log.created_at).toLocaleString()}</span>
                                </div>
                                {log.lat && log.lon ? (
                                    <a href={`https://www.google.com/maps?q=${log.lat},${log.lon}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                                        <MapPin className="w-3 h-3 shrink-0" />{[log.city, log.region, log.country].filter(Boolean).join(', ') || '—'}
                                    </a>
                                ) : <div className="flex items-center gap-1 text-xs text-slate-600"><MapPin className="w-3 h-3 text-slate-400 shrink-0" />{[log.city, log.region, log.country].filter(Boolean).join(', ') || '—'}</div>}
                                {log.precise_lat && log.precise_lon && (
                                    <a href={`https://www.google.com/maps?q=${log.precise_lat},${log.precise_lon}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-green-600 hover:underline">
                                        <MapPin className="w-3 h-3 shrink-0" />Precise: {parseFloat(String(log.precise_lat)).toFixed(4)}, {parseFloat(String(log.precise_lon)).toFixed(4)}
                                        {log.precise_accuracy && <span className="text-slate-400 ml-1">(±{log.precise_accuracy}m)</span>}
                                    </a>
                                )}
                                <div className="flex items-center gap-1 text-xs text-slate-500"><Wifi className="w-3 h-3 text-slate-400 shrink-0" />{log.isp || '—'}</div>
                                <div className="flex items-center gap-1 text-xs text-slate-500"><Clock className="w-3 h-3 text-slate-400 shrink-0" />{log.timezone || '—'}</div>
                                {log.url && <div className="text-xs text-slate-400 truncate">{new URL(log.url).pathname}</div>}
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b bg-slate-50 text-slate-500">
                                    <th className="text-left px-4 py-2 font-medium">IP</th>
                                    <th className="text-left px-4 py-2 font-medium">IP Location</th>
                                    <th className="text-left px-4 py-2 font-medium">Precise Location</th>
                                    <th className="text-left px-4 py-2 font-medium">ISP</th>
                                    <th className="text-left px-4 py-2 font-medium">Timezone</th>
                                    <th className="text-left px-4 py-2 font-medium">Page</th>
                                    <th className="text-left px-4 py-2 font-medium">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((log) => (
                                    <tr key={log.id} className="border-b hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-2 font-mono text-slate-700">{log.ip}</td>
                                        <td className="px-4 py-2">{log.lat && log.lon ? <a href={`https://www.google.com/maps?q=${log.lat},${log.lon}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline"><MapPin className="w-3 h-3 shrink-0" />{[log.city, log.region, log.country].filter(Boolean).join(', ') || '—'}</a> : <div className="flex items-center gap-1 text-slate-600"><MapPin className="w-3 h-3 text-slate-400 shrink-0" />{[log.city, log.region, log.country].filter(Boolean).join(', ') || '—'}</div>}</td>
                                        <td className="px-4 py-2">{log.precise_lat && log.precise_lon ? <a href={`https://www.google.com/maps?q=${log.precise_lat},${log.precise_lon}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-green-600 hover:underline"><MapPin className="w-3 h-3 shrink-0" />{parseFloat(String(log.precise_lat)).toFixed(4)}, {parseFloat(String(log.precise_lon)).toFixed(4)}{log.precise_accuracy && <span className="text-slate-400 ml-1">(±{log.precise_accuracy}m)</span>}</a> : <span className="text-slate-400">—</span>}</td>
                                        <td className="px-4 py-2"><div className="flex items-center gap-1 text-slate-500"><Wifi className="w-3 h-3 text-slate-400 shrink-0" />{log.isp || '—'}</div></td>
                                        <td className="px-4 py-2"><div className="flex items-center gap-1 text-slate-500"><Clock className="w-3 h-3 text-slate-400 shrink-0" />{log.timezone || '—'}</div></td>
                                        <td className="px-4 py-2 text-slate-400 max-w-[180px] truncate" title={log.url ?? ''}>{log.url ? new URL(log.url).pathname : '—'}</td>
                                        <td className="px-4 py-2 text-slate-400 whitespace-nowrap">{new Date(log.created_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-4 py-3 border-t bg-slate-50">
                            <span className="text-xs text-slate-500">Page {page} of {totalPages} · showing {((page-1)*PER_PAGE)+1}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length}</span>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setPage(1)} disabled={page===1} className="px-2 py-1 text-xs rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed">«</button>
                                <button onClick={() => setPage(p=>Math.max(1,p-1))} disabled={page===1} className="px-2 py-1 text-xs rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed">‹</button>
                                {Array.from({length:totalPages},(_,i)=>i+1).filter(p=>p===1||p===totalPages||Math.abs(p-page)<=1).reduce<(number|string)[]>((acc,p,idx,arr)=>{if(idx>0&&(p as number)-(arr[idx-1] as number)>1)acc.push('...');acc.push(p);return acc;},[]).map((p,idx)=>p==='...'?<span key={`e-${idx}`} className="px-1 text-xs text-slate-400">…</span>:<button key={p} onClick={()=>setPage(p as number)} className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${page===p?'bg-slate-800 text-white border-slate-800':'border-slate-200 text-slate-600 hover:bg-slate-100'}`}>{p}</button>)}
                                <button onClick={() => setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} className="px-2 py-1 text-xs rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed">›</button>
                                <button onClick={() => setPage(totalPages)} disabled={page===totalPages} className="px-2 py-1 text-xs rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed">»</button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
