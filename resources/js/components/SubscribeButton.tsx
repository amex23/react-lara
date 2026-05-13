import { route } from 'ziggy-js';

export default function SubscribeButton() {
    return (
        <a
            href={route('subscribe')}
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-yellow-900 shadow-sm hover:bg-yellow-300 transition-colors"
        >
            ⚡ Activate Store — Subscribe ₱600/month
        </a>
    );
}
