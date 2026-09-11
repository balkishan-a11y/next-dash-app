import { lusitana } from '@/app/ui/fonts';
import Breadcrumbs from "@/app/ui/breadcrumbs";
import prisma from '@/app/lib/prisma';
import Rights from '../rights';
import { fetchMenus } from '../../menus/data';

export default async function Page() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
        }
    });
    const menus = await fetchMenus();

    return (
        <div className="w-full">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Users', href: '/dashboard/users' },
                    {
                        label: 'Listing',
                        href: '/dashboard/users/listing',
                        active: true,
                    },
                ]}
            />
            <Rights userlist={users} menus={menus} />
        </div>
    );
}