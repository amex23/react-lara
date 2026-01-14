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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Product',
        href: '/products/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
    });

    const HandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(data);
        post(route('products.store'));
    };
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product" />

            <div className="w-8/12 p-4">
                <form onSubmit={HandleSubmit}  className="space-y-4">

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

                    <Button type="submit" disabled={processing}>
                        Add Product
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
