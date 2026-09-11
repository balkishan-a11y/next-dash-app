import Form from '../create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { createMenu } from '../actions';

export default async function Page() {

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Menus', href: '/dashboard/menus' },
                    {
                        label: 'Create Menu',
                        href: '/dashboard/menus/create',
                        active: true,
                    },
                ]}
            />
            <Form createMenu={createMenu} />
        </main>
    );
}