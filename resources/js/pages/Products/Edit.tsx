import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price?: number | null;
    description?: string | null;
    subscription?: boolean;
    image1_url?: string | null;
    image2_url?: string | null;
    image3_url?: string | null;
    image4_url?: string | null;
    image5_url?: string | null;
    image6_url?: string | null;
}

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {
    const { authUser } = usePage().props as { authUser?: { user_type: string } };

    const isAdmin = authUser?.user_type === 'admin';
    const isUser = authUser?.user_type === 'user';

    const [previews, setPreviews] = useState<Record<string, string | null>>({
        image1: product.image1_url || null,
        image2: product.image2_url || null,
        image3: product.image3_url || null,
        image4: product.image4_url || null,
        image5: product.image5_url || null,
        image6: product.image6_url || null,
    });

    const { data, setData, post, processing, errors } = useForm({
        name: product.name || '',
        description: product.description ?? '',
        // Fields only for admins or users who are allowed to edit them
        ...(isAdmin && {
            price: product.price ?? '',
            subscription: product.subscription ?? false,
        }),
        image1: null as File | null,
        image2: null as File | null,
        image3: null as File | null,
        image4: null as File | null,
        image5: null as File | null,
        image6: null as File | null,
        remove_image1: false,
        remove_image2: false,
        remove_image3: false,
        remove_image4: false,
        remove_image5: false,
        remove_image6: false,
        _method: 'PUT',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.update', product.id));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setData(key as any, file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews((prev) => ({ ...prev, [key]: reader.result as string }));
            };
            reader.readAsDataURL(file);

            setData(`remove_${key}` as any, false);
        }
    };

    const handleRemoveImage = (key: string) => {
        setData(key as any, null);
        setData(`remove_${key}` as any, true);
        setPreviews((prev) => ({ ...prev, [key]: null }));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit Product', href: `/products/${product.id}/edit` }]}>
            <Head title="Update Product" />

            <div className="w-8/12 p-4">
                <form onSubmit={handleUpdate} encType="multipart/form-data" className="space-y-6">

                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc pl-5">
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Always editable: Name */}
                    <div className="space-y-1.5">
                        <Label htmlFor="name">Store URL/Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    {/* Description - editable by both admins and users */}
                    <div className="space-y-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Describe your store or product..."
                        />
                        {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                    </div>

                    {/* Price - only visible/editable for admins */}
                    {isAdmin && (
                        <div className="space-y-1.5">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                            />
                            {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                        </div>
                    )}

                    {/* Subscription - only visible for admins (read-only or editable depending on your rule) */}
                    {isAdmin && (
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="subscription"
                                checked={data.subscription}
                                onCheckedChange={(checked) => setData('subscription', !!checked)}
                            />
                            <Label htmlFor="subscription" className="cursor-pointer">
                                Subscription Product
                            </Label>
                        </div>
                    )}

                    {/* Images - editable by both admins and normal users */}
                    {['image1', 'image2', 'image3', 'image4', 'image5', 'image6'].map((key, index) => (
                        <div key={key} className="space-y-1.5">
                            <Label htmlFor={key}>Store Image {index + 1}</Label>

                            {previews[key] && (
                                <div className="mb-4 relative inline-block">
                                    <img
                                        src={previews[key]!}
                                        alt={`Preview ${index + 1}`}
                                        className="w-32 h-32 object-cover rounded border shadow-sm"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-1 right-1"
                                        onClick={() => handleRemoveImage(key)}
                                    >
                                        ×
                                    </Button>
                                </div>
                            )}

                            <Input
                                id={key}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, key)}
                            />

                            {data[key] && (
                                <p className="text-sm text-muted-foreground">
                                    New file: {data[key]?.name}
                                </p>
                            )}

                            {errors[key] && <p className="text-sm text-destructive">{errors[key]}</p>}
                        </div>
                    ))}

                    <div className="pt-6">
                        <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                            {processing ? 'Updating...' : 'Update Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
