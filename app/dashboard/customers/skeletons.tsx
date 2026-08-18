export function CustomersTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <div className="mb-2 w-full rounded-md bg-white p-4">
              <div className="h-6 w-24 rounded bg-gray-100"></div>
            </div>
            <div className="mb-2 w-full rounded-md bg-white p-4">
              <div className="h-6 w-24 rounded bg-gray-100"></div>
            </div>
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Invoices
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Pending
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Total Paid
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="w-full border-b border-gray-100 py-3 text-sm last-of-type:border-none">
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="h-6 w-32 rounded bg-gray-100"></div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <div className="h-6 w-32 rounded bg-gray-100"></div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <div className="h-6 w-16 rounded bg-gray-100"></div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <div className="h-6 w-16 rounded bg-gray-100"></div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <div className="h-6 w-16 rounded bg-gray-100"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
