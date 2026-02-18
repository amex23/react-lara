import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Products', href: route('products.index') },
    { title: 'Create Store Profile', href: route('products.create') },
];

export default function Create() {
    const { authUser } = usePage().props as { authUser: any };

    const isAdmin = authUser?.user_type === 'admin';

    const { data, setData, post, processing, errors } = useForm({
        name:         authUser?.name ?? '',
        description:  authUser?.description ?? '',
        price:        authUser?.price ?? '',
        subscription: !!authUser?.subscription,
        image1: null as File | null,
        image2: null as File | null,
        image3: null as File | null,
        image4: null as File | null,
        image5: null as File | null,
        image6: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'), { preserveScroll: true });
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: keyof typeof data,
    ) => {
        const file = e.target.files?.[0];
        if (file) setData(key, file);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Store Profile" />

            <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-6">
                    {isAdmin ? 'Create Store Profile' : 'Set Up Your Store Profile'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Fix the following errors:</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc pl-5 mt-2">
                                    {Object.entries(errors).map(([key, msg]) => (
                                        <li key={key}>{msg as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Store / Display Name *</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="My Awesome Store"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description ?? ''}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Tell customers about your store or product…"
                            rows={5}
                        />
                    </div>

                    {/* Price — visible to everyone */}
                    <div className="space-y-2">
                        <Label htmlFor="price">Price (USD)</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            placeholder="19.99"
                        />
                    </div>

                    {/* Subscription — admin only, not shown on self-setup */}

                    {/* Images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => {
                            const idx = i + 1;
                            const key = `image${idx}` as keyof typeof data;
                            return (
                                <div key={idx} className="space-y-2">
                                    <Label htmlFor={key}>Image {idx}</Label>
                                    <Input
                                        id={key}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/gif"
                                        onChange={(e) => handleImageChange(e, key)}
                                    />
                                    {data[key] && (
                                        <p className="text-xs text-muted-foreground truncate">
                                            {(data[key] as File).name}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto"
                        >
                            {processing ? 'Saving…' : 'Create Profile'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
