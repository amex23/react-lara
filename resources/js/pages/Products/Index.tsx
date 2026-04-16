import { Button } from '@/components/ui/button';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Megaphone, Plus } from 'lucide-react';
import AdminView from './Components/AdminView';
import UserView from './Components/UserView';

interface Product {
    id: number;
    name: string;
    user_id: number;
    description?: string | null;
    price?: string | number | null;
    subscription?: boolean;
    image1_url?: string | null;
}

interface PageProps {
    products: Product[];
    authUser: { id: number; user_type: 'admin' | 'user'; name: string };
    flash?: { message?: string };
    createUrl: string;
    editUrlBase: string;
}

export default function Index() {
    const { products, authUser, flash, createUrl, editUrlBase } = usePage<PageProps>().props;
    const isAdmin = authUser.user_type === 'admin';

    const userAlreadyHasProfile = !isAdmin && products.some(
        (p) => p.user_id === authUser.id && (p.description || p.image1_url || p.price != null),
    );

    const myProfile = !isAdmin ? products[0] : null;

    return (
        <AppLayout breadcrumbs={[{
            title: isAdmin ? 'Products' : 'Dashboard',
            href: isAdmin ? route('products.index') : '/dashboard',
        }]}>
            <Head title={isAdmin ? 'All Store Profiles' : 'My Store Profile'} />

            <div className="w-full max-w-7xl mx-auto py-6 px-4 lg:px-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-7 mb-6">
                    <div className='w-full flex justify-center flex-col gap-y-5'>
                        <h1 className="text-3xl text-center font-bold">
                            {isAdmin ? 'All Store Profiles' : 'My Store Profile'}
                        </h1>

                        {!isAdmin && (
                            <UserView
                                products={products}
                                myProfile={myProfile}
                                editUrlBase={editUrlBase}
                            />
                        )}
                    </div>

                    {isAdmin ? (
                        <a href={route('register.admin')}><Button><Plus className="mr-2 h-4 w-4" />New User / Profile</Button></a>
                    ) : !userAlreadyHasProfile ? (
                        <a href={createUrl}><Button><Plus className="mr-2 h-4 w-4" />Set Up My Store</Button></a>
                    ) : null}
                </div>

                {flash?.message && (
                    <Alert className="mb-6">
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}

                {isAdmin && (
                    <AdminView
                        products={products}
                        editUrlBase={editUrlBase}
                    />
                )}
            </div>
        </AppLayout>
    );
}
