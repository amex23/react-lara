import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-0 md:gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center relative gap-0 md:gap-2 w-full">
                <SidebarTrigger className="-ml-1 z-9" />
                {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
                <span className='w-full flex justify-center md:justify-start  absolute md:relative'>
                    Dashboard
                </span>
            </div>
        </header>
    );
}
