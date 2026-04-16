import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';

export default function DeleteButton({ url, name }: { url: string; name: string }) {
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
