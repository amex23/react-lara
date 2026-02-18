import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert, CheckCircle } from 'lucide-react';

export default function Edit() {
    const { product, targetUser, authUser, indexRoute } = usePage().props as {
        product: any;
        targetUser: { id: number; name: string; user_type: string };
        authUser: any;
        indexRoute: string;
    };

    const [showSuccess, setShowSuccess] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: authUser?.user_type === 'admin' ? 'Products' : 'Dashboard', href: indexRoute },
        { title: 'Edit Store Profile', href: '#' },
    ];

    const isAdmin      = authUser?.user_type === 'admin';
    const isOwnProfile = targetUser?.id === authUser?.id;

    const { data, setData, post, processing, errors } = useForm({
        _method:      'PUT',
        name:         product.name        ?? '',
        description:  product.description ?? '',
        price:        product.price       ?? '',
        subscription: !!product.subscription,
        image1: null as File | null,
        image2: null as File | null,
        image3: null as File | null,
        image4: null as File | null,
        image5: null as File | null,
        image6: null as File | null,
    });

    const basePath = isAdmin ? '/products' : '/dashboard';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post(`${basePath}/${product.id}`, {
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => {
                    window.location.href = indexRoute;
                }, 2000);
            },
        });
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
            <Head title={`Edit ${product.name || 'Store Profile'}`} />

            {/* Success popup overlay */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-in fade-in duration-200">
                    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4 animate-in zoom-in duration-200">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Success!</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Store profile updated successfully
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
                    </div>
                </div>
            )}

            <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Edit Store Profile</h1>

                    {isAdmin && !isOwnProfile && (
                        <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded">
                            Editing store of: <strong>{targetUser?.name}</strong>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Errors:</AlertTitle>
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
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={5}
                        />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <Label htmlFor="price">Price (USD)</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                    </div>

                    {/* Subscription — admin only */}
                    {isAdmin && (
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="subscription"
                                checked={data.subscription}
                                onCheckedChange={(checked) =>
                                    setData('subscription', !!checked)
                                }
                            />
                            <Label htmlFor="subscription">
                                Subscription product / service
                            </Label>
                        </div>
                    )}

                    {/* Images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => {
                            const idx    = i + 1;
                            const key    = `image${idx}` as keyof typeof data;
                            const urlKey = `image${idx}_url` as keyof typeof product;

                            return (
                                <div key={idx} className="space-y-2">
                                    <Label htmlFor={key}>Image {idx}</Label>

                                    {product[urlKey] && (
                                        <div className="mb-2">
                                            <img
                                                src={product[urlKey]}
                                                alt={`Current image ${idx}`}
                                                className="h-20 w-20 object-cover rounded border"
                                            />
                                        </div>
                                    )}

                                    <Input
                                        id={key}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/gif"
                                        onChange={(e) => handleImageChange(e, key)}
                                    />

                                    {data[key] && (
                                        <p className="text-xs text-muted-foreground truncate">
                                            New: {(data[key] as File).name}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-4 flex gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving…' : 'Save Changes'}
                        </Button>
                        <Button variant="outline" asChild>
                            <a href={indexRoute}>Cancel</a>
                        </Button>
                        <Button className='ml-5' variant="outline" asChild>
                            <a href={indexRoute}>Back to Dashboard</a>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

