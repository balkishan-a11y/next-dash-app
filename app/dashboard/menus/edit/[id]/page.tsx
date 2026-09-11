import Form from '../edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchMenuById } from '../data';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = Number(params.id);
  const [menu] = await Promise.all([
    fetchMenuById(id),
  ]);

  if (!menu) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Menus', href: '/dashboard/menus' },
          {
            label: 'Edit Menu',
            href: `/dashboard/menus/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form menu={menu} />
    </main>
  );
}