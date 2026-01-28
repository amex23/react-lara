import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    subscription: boolean;
    image1?: string;
    image1_url?: string;
    image2?: string;
    image2_url?: string;
    image3?: string;
    image3_url?: string;
    image4?: string;
    image4_url?: string;
    image5?: string;
    image5_url?: string;
    image6?: string;
    image6_url?: string;
}

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {
    const [previews, setPreviews] = useState<Record<string, string | null>>({
        image1: product.image1_url || null,
        image2: product.image2_url || null,
        image3: product.image3_url || null,
        image4: product.image4_url || null,
        image5: product.image5_url || null,
        image6: product.image6_url || null,
    });

    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
        subscription: product.subscription,
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
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData(key as any, file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews((prev) => ({ ...prev, [key]: reader.result as string }));
            };
            reader.readAsDataURL(file);

            // If uploading new image, clear remove flag
            setData(`remove_${key}` as any, false);
        }
    };

    const handleRemoveImage = (key: string) => {
        setData(key as any, null);
        setData(`remove_${key}` as any, true);
        setPreviews((prev) => ({ ...prev, [key]: null }));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit a Product', href: `/products/${product.id}/edit` }]}>
            <Head title="Update a Product" />

            <div className="w-8/12 p-4">
                <form onSubmit={handleUpdate} className="space-y-4">

                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Name, Price, Description, Subscription fields remain the same */}

                    <div className="space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    {/* ... price, description, subscription checkbox ... */}

                    {/* Image Fields */}
                    {['image1', 'image2', 'image3', 'image4', 'image5', 'image6'].map((key, index) => (
                        <div key={key} className="space-y-1.5">
                            <Label htmlFor={key}>Product Image {index + 1}</Label>

                            {previews[key] && (
                                <div className="mb-3">
                                    <img
                                        src={previews[key]!}
                                        alt={`Preview ${index + 1}`}
                                        className="w-32 h-32 object-cover rounded border"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="mt-2"
                                        onClick={() => handleRemoveImage(key)}
                                    >
                                        Remove Image
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
                                    New image selected: {data[key]?.name}
                                </p>
                            )}
                        </div>
                    ))}

                    <Button type="submit" disabled={processing}>
                        Update Product
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}