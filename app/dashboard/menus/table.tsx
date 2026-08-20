import { UpdateMenu, DeleteMenu } from './buttons';
import { fetchFilteredMenus } from './data';

export default async function MenusTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const menus = await fetchFilteredMenus(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {menus?.map((menu) => (
              <div key={menu.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{menu.name}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {menu.status === '1' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xs text-gray-500">Parent</p>
                    <p className="text-sm font-medium">{menu.parent_menu || '-'}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateMenu id={String(menu.id)} />
                    <DeleteMenu id={String(menu.id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Page Name</th>
                <th scope="col" className="px-3 py-5 font-medium">URL</th>
                <th scope="col" className="px-3 py-5 font-medium">Status</th>
                <th scope="col" className="px-3 py-5 font-medium">Parent Menu</th>
                <th scope="col" className="px-3 py-5 font-medium">Icon</th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {menus?.map((menu) => (
                <tr
                  key={menu.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p className="font-medium">{menu.name}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{menu.path}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${menu.status === '1'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {menu.status === '1' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{menu.parent_menu || '-'}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <i className={`${menu.icon} text-gray-600`} />
                    <span className="ml-2 text-xs text-gray-400">{menu.icon}</span>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateMenu id={String(menu.id)} />
                      <DeleteMenu id={String(menu.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
