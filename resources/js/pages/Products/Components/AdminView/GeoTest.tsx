import { useState } from 'react';
import { MapPin } from 'lucide-react';

export default function GeoTest() {
    const [result, setResult] = useState<string | null>(null);
    const [error, setError]   = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const test = () => {
        setLoading(true); setError(null); setResult(null);
        navigator.geolocation.getCurrentPosition(
            (pos) => { const { latitude, longitude, accuracy } = pos.coords; setResult(`${latitude}, ${longitude} (±${Math.round(accuracy)}m)`); setLoading(false); },
            (err) => { setError(err.message); setLoading(false); },
            { enableHighAccuracy: true }
        );
    };

    return (
        <div className="w-full bg-white border rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-slate-500" />
                <h2 className="text-sm font-semibold text-slate-700">Geolocation Test (Admin)</h2>
            </div>
            <button onClick={test} disabled={loading} className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors">
                {loading ? 'Requesting...' : 'Get My Precise Location'}
            </button>
            {result && (
                <div className="mt-3 space-y-2">
                    <p className="text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg font-mono">{result}</p>
                    <a href={`https://www.google.com/maps?q=${result.split(' (')[0]}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                        <MapPin className="w-3 h-3" /> Open in Google Maps
                    </a>
                </div>
            )}
            {error && <p className="mt-3 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
        </div>
    );
}
