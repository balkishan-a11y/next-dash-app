import prisma from '@/app/lib/prisma';
import LinkList from './link-list';
import { cookies } from 'next/headers';
// import { fetchMenus } from '@/app/dashboard/menus/data';

export default async function NavLinks() {
  // const menus = await fetchMenus();
  const cookiesStore = await cookies();
  const user_id = cookiesStore.get('session')?.value;
  const menu_links = await prisma.userAssignRights.findMany({
    where: {
      user_id: user_id,
    },
    select: {
      menu_id: true,
    }
  });
  const menu_ids = menu_links.map((menu_link) => Number(menu_link.menu_id));
  const menus = await prisma.menu.findMany({
    where: {
      id: {
        in: menu_ids,
      },
    },
  });
  // console.log(menu_ids);

  let links: any = {};
  menus.map((value) => {
    if (value.type == "1") {
      var name = value.name.replace(" ", "_");
      links[name] = {
        id: value.id,
        label:
          value.name.charAt(0).toUpperCase() +
          value.name.slice(1),
        icon: value.icon,
        status: value.status,
        sub_menu: [],
      }
    }
  });

  menus.map((value) => {
    if (value.type == "0") {
      links[value.parent_menu].sub_menu.push({
        id: value.id,
        label:
          value.name.charAt(0).toUpperCase() +
          value.name.slice(1),
        href:
          value.name === 'home'
            ? '/dashboard'
            : '/dashboard' + value.path,

        icon: value.icon,
        parent_menu: value.parent_menu,
        status: value.status,
      });
    }
  });
  // console.log(menus);

  return <LinkList menu_links={links} />
}
