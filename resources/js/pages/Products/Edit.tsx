import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { CircleAlert } from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image1?: string;
}

interface Props {
    product: Product;
}

export default function Edit({product} : Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(
        product.image1 ? `/storage/${product.image1}` : null
    );

    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
        image1: null as File | null,
        _method: 'PUT',
    });

    const HandleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.update', product.id));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('image1', file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setData('image1', null);
        setImagePreview(null);
    };
  
    return (
        <AppLayout breadcrumbs={[{title: 'Edit a Product', href: `/products/${product.id}/edit`}]}>
            <Head title="Update a Product" />

            <div className="w-8/12 p-4">
                <form onSubmit={HandleUpdate} className="space-y-4">

                    {/* display error */}
                  
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert className='h-4 w-4' />
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
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Product Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

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

                    <div className="space-y-1.5">
                        <Label htmlFor="image1">Product Image</Label>
                        
                        {imagePreview && (
                            <div className="mb-3">
                                <img 
                                    src={imagePreview} 
                                    alt="Product preview" 
                                    className="w-32 h-32 object-cover rounded border"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="mt-2"
                                    onClick={handleRemoveImage}
                                >
                                    Remove Image
                                </Button>
                            </div>
                        )}
                        
                        <Input
                            id="image1"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {data.image1 && (
                            <p className="text-sm text-muted-foreground">
                                New image selected: {data.image1.name}
                            </p>
                        )}
                    </div>

                    <Button type="submit" disabled={processing}>
                        Update Product
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}