'use server'
import prisma from "@/app/lib/prisma";
export async function saveRights(menuData) {
    const response = {
        error: false,
        msg: ''
    };
    // console.log(menuData);
    if (menuData.length <= 0) {
        response.error = true;
        response.msg = "invalid data";
        return response;
    }
    const datatosave = [];
    menuData.menu_ids.forEach(element => {
        datatosave.push({ user_id: menuData.user_id, menu_id: element });
    });

    try {
        await prisma.userAssignRights.deleteMany({
            where: {
                user_id: menuData.user_id,
            },
        });
        if (datatosave.length > 0) {
            const result = await prisma.userAssignRights.createMany({
                data: datatosave
            });
        }
    } catch (error) {
        console.error("Error saving rights:", error);
        response.error = true;
        response.msg = "Failed to assign menu rights";
    }
    response.error = false;
    response.msg = "Menu rights assigned successfully";
    return response;
}
export async function getAssignedMenus(user_id: string) {
    const menus = await prisma.userAssignRights.findMany({
        where: {
            user_id: user_id,
        },
    });
    const menuIds = menus.map((menu) => menu.menu_id);

    return menuIds;
}