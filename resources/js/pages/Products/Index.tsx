import { Button } from '@/components/ui/button';
import { Head, usePage, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Megaphone, Plus } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Product {
    id: number;
    name: string;
    user_id: number;
    owner_name?: string;
    description?: string | null;
    price?: string | number | null;
    subscription?: boolean;
    image1_url?: string | null;
    image2_url?: string | null;
    image3_url?: string | null;
    image4_url?: string | null;
    image5_url?: string | null;
    image6_url?: string | null;
}

interface PageProps {
    products: Product[];
    authUser: { id: number; user_type: 'admin' | 'user'; name: string };
    flash?: { message?: string };
    createUrl: string;
    editUrlBase: string;
}

// Separate component so each row gets its own useForm instance for delete
function DeleteButton({ url, name }: { url: string; name: string }) {
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

export default function Index() {
    const { products, authUser, flash, createUrl, editUrlBase } = usePage<PageProps>().props;

    const isAdmin = authUser.user_type === 'admin';

    const userAlreadyHasProfile =
        !isAdmin &&
        products.some(
            (p) =>
                p.user_id === authUser.id &&
                (p.description || p.image1_url || p.price != null),
        );

    return (
        <AppLayout breadcrumbs={[{
            title: isAdmin ? 'Products' : 'Dashboard',
            href: isAdmin ? route('products.index') : '/dashboard',
        }]}>
            <Head title={isAdmin ? 'All Store Profiles' : 'My Store Profile'} />

          

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-7 mb-6">
                    <div className='w-full flex justify-center flex-col gap-y-5'>
                        <h1 className="text-3xl text-center font-bold">
                        {isAdmin ? 'All Store Profiles' : 'My Store Profile'}
                        </h1>

                        <div className='w-full flex justify-between'>
                            <h2 className="text-lg text-center">
                        {isAdmin ? '' : 'Total Views: 12'}
                        </h2>

                         <h2 className="text-lg text-center">
                        {isAdmin ? '' : 'Total Checkout: 3'}
                        </h2>
                        </div>
                        
                    </div>

                   

                    {isAdmin ? (
                        <a href={route('register.admin')}>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                New User / Profile
                            </Button>
                        </a>
                    ) : !userAlreadyHasProfile ? (
                        <a href={createUrl}>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Set Up My Store
                            </Button>
                        </a>
                    ) : null}
                </div>

                {flash?.message && (
                    <Alert className="mb-6">
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}

                {products.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground border rounded-lg">
                        {isAdmin
                            ? 'No store profiles have been created yet.'
                            : "You haven't set up your store profile yet."}
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    
                                    {isAdmin && (
                                          <TableHead className="w-16">ID</TableHead>
                                    )}

                                    {isAdmin && <TableHead className="w-44">Owner</TableHead>}
                                    <TableHead>My Images</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Sub</TableHead>
                                    <TableHead className="text-right w-36">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        

                                        {isAdmin && (
                                           <TableCell className="font-medium">{product.id}</TableCell>
                                        )}
                                        

                                        {isAdmin && (
                                            <TableCell className="text-sm">
                                                {product.owner_name || `User #${product.user_id}`}
                                            </TableCell>
                                        )}

                                        <TableCell>
                                            <div className="flex gap-1.5 flex-wrap max-w-[140px]">
                                                {[1, 2, 3, 4, 5, 6].map((i) => {
                                                    const key = `image${i}_url` as keyof Product;
                                                    return product[key] ? (
                                                        <img
                                                            key={i}
                                                            src={product[key] as string}
                                                            alt={`Image ${i}`}
                                                            className="w-10 h-10 object-cover rounded border shadow-sm"
                                                        />
                                                    ) : null;
                                                })}
                                                {![1, 2, 3, 4, 5, 6].some(
                                                    (i) => product[`image${i}_url` as keyof Product],
                                                ) && (
                                                    <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                                                        no img
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>

                                        <TableCell className="font-medium">{product.name}</TableCell>

                                                    
                                        <TableCell>
                                            {product.price != null
                                                ? `$${Number(product.price).toFixed(2)}`
                                                : '—'}
                                        </TableCell>

                                        <TableCell className="max-w-md truncate text-sm text-muted-foreground">
                                            {product.description || '—'}
                                        </TableCell>

                                        <TableCell>
                                            {product.subscription ? (
                                                <span className="text-green-600 font-medium">Yes</span>
                                            ) : (
                                                <span className="text-slate-400">No</span>
                                            )}
                                        </TableCell>

                                        <TableCell className="text-right space-x-2">
                                            <a href={`${editUrlBase}/${product.id}/edit`}>
                                                <Button size="sm" variant="outline">
                                                    Edit
                                                </Button>
                                            </a>
                                            {/* Clear button - admin only */}
                                            {isAdmin && (
                                                <DeleteButton
                                                    url={`${editUrlBase}/${product.id}`}
                                                    name={product.name}
                                                />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
