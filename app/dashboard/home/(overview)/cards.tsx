import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from './data';

const iconMap = {
  collected: 'fa-solid fa-money-bill-wave',
  customers:  'fa-solid fa-users',
  pending:    'fa-solid fa-clock',
  invoices:   'fa-solid fa-inbox',
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  return (
    <>
      <Card title="Collected"       value={totalPaidInvoices}   type="collected" />
      <Card title="Pending"         value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices"  value={numberOfInvoices}    type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers}   type="customers" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const iconClass = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {iconClass ? <i className={`${iconClass} h-5 w-5 text-gray-700`} /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
