import Form from '../create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers } from '@/app/dashboard/customers/data';

export default async function Page() {

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
            <Form />
        </main>
    );
}