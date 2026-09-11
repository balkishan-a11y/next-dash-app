import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '../table';
import { CreateInvoice } from '../buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '../skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '../data';
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
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Listing',
            href: '/dashboard/invoices/listing',
            active: true,
          },
        ]}
      />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-end">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}