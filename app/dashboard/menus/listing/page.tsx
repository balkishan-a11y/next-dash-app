import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '../table';
import { CreateMenu } from '../buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchMenusPages } from '../data';
import { MenusTableSkeleton } from '../skeletons';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchMenusPages(query);

    return (
        <div className="w-full">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Menus', href: '/dashboard/menus' },
                    {
                        label: 'Listing',
                        href: '/dashboard/menus/listing',
                        active: true,
                    },
                ]}
            />
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search menus..." />
                <CreateMenu />
            </div>
            <Suspense key={query + currentPage} fallback={<MenusTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-end">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}