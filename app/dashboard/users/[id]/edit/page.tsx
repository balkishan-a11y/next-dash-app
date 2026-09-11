import Form from '../../edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers } from '@/app/dashboard/customers/data';
import { notFound } from 'next/navigation';
import { fetchUserById } from '@/app/dashboard/users/data';
import { updateUser } from '../../actions';


export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [user] = await Promise.all([
        fetchUserById(id),
    ]);

    if (!user) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Users', href: '/dashboard/users' },
                    {
                        label: 'Create User',
                        href: '/dashboard/users/create',
                        active: true,
                    },
                ]}
            />
            <Form user={user} updateUser={updateUser} />
        </main>
    );
}