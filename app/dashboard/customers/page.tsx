import CustomersTable from './table';
import { fetchFilteredCustomers } from './data';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <main className="w-full">
      <CustomersTable customers={customers} />
    </main>
  );
}