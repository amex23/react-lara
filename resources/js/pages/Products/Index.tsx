import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';
import { usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';
import { Megaphone } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface PageProps {
    flash: {
        message?: string
    };
}

export default function Products() {
    const  { flash } =  usePage().props as PageProps;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4'>
                <Link href={route('products.create')}>
                    <Button>Create a product</Button>
                </Link>
            </div>

            <div className="m-4">
                <div>
                    {flash.message && (
                        <Alert>
                            <Megaphone className='h-4 w-4' />
                            <CircleAlert className='h-4 w-4' />
                            <AlertTitle>Notification</AlertTitle>
                            <AlertDescription>
                                {flash.message}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
