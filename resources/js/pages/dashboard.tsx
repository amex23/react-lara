import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

               <span>
                 <h1 className='text-3xl font-bold text-center my-3'>Conversion Stats</h1>
                <p className='text-center'>https://naturepackaged.com/</p>
               </span>

                <div className="mt-2 grid auto-rows-min gap-4 md:grid-cols-2 items-center">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <h2 className='font-bold text-center mt-3 text-2xl'>Total Clicks</h2>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>

                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <h2 className='font-bold text-center mt-3 text-2xl'>Checkouts</h2>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>

                
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">

                    <h2 className='font-bold text-center mt-3 text-2xl'>Current MyDay</h2>

                    <div className="p-4 grid grid-cols-3 grid-rows-2 gap-x-3 gap-y-4">
                    <span className="rounded-md bg-green-400">1</span>
                    <span className="rounded-md bg-green-400">2</span>
                    <span className="rounded-md bg-green-400">3</span>
                    <span className="rounded-md bg-green-400">4</span>
                    <span className="rounded-md bg-green-400">5</span>
                    <span className="rounded-md bg-green-400">6</span>
                    </div>

                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>

            </div>
        </AppLayout>
    );
}
