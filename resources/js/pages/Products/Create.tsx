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
    { title: 'Create a New Product', href: '/products/create' },
];

export default function Create() {
    const { props } = usePage();
    const authUser = props.authUser;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
        image1: null as File | null,
        image2: null as File | null,
        image3: null as File | null,
        image4: null as File | null,
        image5: null as File | null,
        image6: null as File | null,
        subscription: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if (e.target.files && e.target.files[0]) {
            setData(key as any, e.target.files[0]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product" />

            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Errors */}
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

                    <div className="space-y-1.5">
                        <Label htmlFor="name">Store URL/Name</Label>
                        <Input
                            id="name"
                            placeholder="Product Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    {authUser?.user_type !== 'user' && (
                        <>
                            <div className="space-y-1.5">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    placeholder="Price"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                            </div>

                            {/* Subscription Checkbox */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="subscription"
                                    checked={data.subscription}
                                    onCheckedChange={(checked) => setData('subscription', !!checked)}
                                />
                                <Label htmlFor="subscription">Subscription Product</Label>
                            </div>
                        </>
                    )}

                    {/* Image Uploads */}
                    {['image1', 'image2', 'image3', 'image4', 'image5', 'image6'].map((key, index) => (
                        <div key={key} className="space-y-1.5">
                            <Label htmlFor={key}>Product Image {index + 1}</Label>
                            <Input
                                id={key}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, key)}
                            />
                            {data[key] && (
                                <p className="text-sm text-muted-foreground">
                                    Selected: {data[key]?.name}
                                </p>
                            )}
                        </div>
                    ))}

                    <Button type="submit" disabled={processing}>
                        Add Product
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}