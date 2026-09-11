'use server'
import prisma from '@/app/lib/prisma';

const ITEMS_PER_PAGE = 10;

export async function fetchFilteredMenus(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const menus = await prisma.menu.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { path: { contains: query } },
          { parent_menu: { contains: query } },
        ],
      },
      orderBy: { id: 'desc' },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });
    return menus;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch menus.');
  }
}

export async function fetchMenusPages(query: string) {
  try {
    const count = await prisma.menu.count({
      where: {
        OR: [
          { name: { contains: query } },
          { path: { contains: query } },
          { parent_menu: { contains: query } },
        ],
      },
    });
    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of menus.');
  }
}

export async function fetchMenuById(id: number) {
  try {
    const menu = await prisma.menu.findUnique({ where: { id } });
    return menu;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch menu.');
  }
}
export async function fetchMenus() {
  try {
    const data = await prisma.menu.findMany({
      select: {
        id: true,
        name: true,
        path: true,
        icon: true,
        parent_menu: true,
        status: true,
        type: true
      },
    });

    // console.log('DB DATA:', data);
    let links: any = {};
    data.map((value) => {
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
    // console.log(links);

    data.map((value) => {

      if (value.type == "0") {
        // console.log(value.parent_menu);

        // console.log(links[value.parent_menu]);
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
    // console.log(links);
    return links;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch menu data.');
  }
}

