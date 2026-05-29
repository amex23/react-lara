import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';

interface LineItem {
    name: string;
    quantity: number;
    price: string;
}

interface Order {
    id: number;
    shopify_order_id: string;
    customer_name: string | null;
    customer_email: string | null;
    total_price: number;
    line_items: string;
    ordered_at: string;
}

interface OrdersResponse {
    total: number;
    revenue: number;
    orders: {
        data: Order[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

const CURRENCY_SYMBOLS: Record<string, string> = { USD: '$', PHP: '₱', EUR: '€', GBP: '£', AUD: 'A$', SGD: 'S$', JPY: '¥' };

export default function OrdersSection({ currency = 'USD' }: { currency?: string }) {
    const sym = CURRENCY_SYMBOLS[currency] ?? currency;
    const [data, setData]       = useState<OrdersResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage]       = useState(1);
    const [from, setFrom]       = useState('');
    const [to, setTo]           = useState('');

    const fetchOrders = (p = 1) => {
        setLoading(true);
        const params = new URLSearchParams({ page: String(p) });
        if (from) params.append('from', from);
        if (to)   params.append('to', to);
        fetch(`/api/orders?${params}`, { headers: { 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' })
            .then(r => r.json())
            .then(d => { setData(d); setLoading(false); })
            .catch(() => setLoading(false));
    };

    useEffect(() => { fetchOrders(1); setPage(1); }, [from, to]);

    const handlePageChange = (p: number) => { setPage(p); fetchOrders(p); };
    const parseItems = (raw: string): LineItem[] => { try { return JSON.parse(raw); } catch { return []; } };
    const totalPages = data?.orders?.last_page ?? 1;

    return (
        <div className="w-full bg-white border rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="px-4 py-3 border-b bg-slate-50 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-slate-500" />
                    <h2 className="text-sm font-semibold text-slate-700">Orders from ShopMyDay</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 ml-auto">
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs text-slate-500 whitespace-nowrap">From</label>
                        <input type="date" value={from} onChange={e => setFrom(e.target.value)}
                            className="text-xs border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs text-slate-500 whitespace-nowrap">To</label>
                        <input type="date" value={to} onChange={e => setTo(e.target.value)}
                            className="text-xs border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300" />
                    </div>
                    {(from || to) && (
                        <button onClick={() => { setFrom(''); setTo(''); }}
                            className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded-md hover:bg-red-50 transition-colors">Clear</button>
                    )}
                </div>
            </div>

            {!loading && data && (
                <div className="flex divide-x border-b">
                    <div className="flex-1 px-6 py-4 text-center">
                        <div className="text-2xl font-bold text-slate-800">{data.total}</div>
                        <div className="text-xs text-slate-500 mt-0.5">Total Orders</div>
                    </div>
                    <div className="flex-1 px-6 py-4 text-center">
                        <div className="text-2xl font-bold text-emerald-600">{sym}{(data.revenue ?? 0).toFixed(2)}</div>
                        <div className="text-xs text-slate-500 mt-0.5">Total Revenue</div>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="p-6 text-center text-sm text-slate-400">Loading...</div>
            ) : !data?.orders?.data?.length ? (
                <div className="p-8 text-center">
                    <ShoppingBag className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">No orders yet from ShopMyDay.</p>
                    <p className="text-xs text-slate-300 mt-1">Orders will appear here when customers purchase after clicking your story widget.</p>
                </div>
            ) : (
                <>
                    <div className="flex flex-col divide-y md:hidden">
                        {data.orders.data.map(order => {
                            const items = parseItems(order.line_items);
                            return (
                                <div key={order.id} className="p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono text-slate-500">#{order.shopify_order_id}</span>
                                        <span className="text-xs font-semibold text-emerald-600">{sym}{Number(order.total_price).toFixed(2)}</span>
                                    </div>
                                    <div className="text-sm font-medium text-slate-700">{order.customer_name || '—'}</div>
                                    {order.customer_email && <div className="text-xs text-slate-400">{order.customer_email}</div>}
                                    <div className="space-y-0.5">
                                        {items.map((item, i) => (
                                            <div key={i} className="text-xs text-slate-500">
                                                {item.quantity}× {item.name} <span className="text-slate-400">{sym}{item.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-xs text-slate-400">{new Date(order.ordered_at).toLocaleString()}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b bg-slate-50 text-slate-500">
                                    <th className="text-left px-4 py-2 font-medium">Order ID</th>
                                    <th className="text-left px-4 py-2 font-medium">Customer</th>
                                    <th className="text-left px-4 py-2 font-medium">Items</th>
                                    <th className="text-left px-4 py-2 font-medium">Amount</th>
                                    <th className="text-left px-4 py-2 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.orders.data.map(order => {
                                    const items = parseItems(order.line_items);
                                    return (
                                        <tr key={order.id} className="border-b hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 font-mono text-slate-500">#{order.shopify_order_id}</td>
                                            <td className="px-4 py-3">
                                                <div className="font-medium text-slate-700">{order.customer_name || '—'}</div>
                                                {order.customer_email && <div className="text-slate-400 mt-0.5">{order.customer_email}</div>}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="space-y-0.5">
                                                    {items.map((item, i) => (
                                                        <div key={i} className="text-slate-600">
                                                            {item.quantity}× {item.name}
                                                            <span className="text-slate-400 ml-1">{sym}{item.price}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-emerald-600">{sym}{Number(order.total_price).toFixed(2)}</td>
                                            <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{new Date(order.ordered_at).toLocaleString()}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-4 py-3 border-t bg-slate-50">
                            <span className="text-xs text-slate-500">Page {page} of {totalPages}</span>
                            <div className="flex items-center gap-1">
                                <button onClick={() => handlePageChange(1)} disabled={page === 1} className="px-2 py-1 text-xs rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed">«</button>
                                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-2 py-1 text-xs rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed">‹</button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                    .reduce<(number | string)[]>((acc, p, idx, arr) => {
                                        if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push('...');
                                        acc.push(p); return acc;
                                    }, [])
                                    .map((p, idx) => p === '...' ? (
                                        <span key={`e-${idx}`} className="px-1 text-xs text-slate-400">…</span>
                                    ) : (
                                        <button key={p} onClick={() => handlePageChange(p as number)}
                                            className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${page === p ? 'bg-slate-800 text-white border-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'}`}>{p}</button>
                                    ))}
                                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="px-2 py-1 text-xs rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed">›</button>
                                <button onClick={() => handlePageChange(totalPages)} disabled={page === totalPages} className="px-2 py-1 text-xs rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed">»</button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
