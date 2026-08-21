'use client';
import { useEffect, useState } from "react";
import { saveRights, getAssignedMenus } from "./action";
import Loader from "@/app/ui/loader";
import ResponseMessage from "@/app/ui/responseMessage";
import { fetchMenus } from "../menus/data";

export default function Rights({ userlist, menus }) {
    const [checkedMenus, setCheckedMenus] = useState({});
    const [checkedSubMenus, setCheckedSubmenus] = useState({});
    const [selectedUser, setSelectedUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState({});

    async function handleUserChange(event) {
        const userId = event.target.value;

        setSelectedUser(userId);

        const menu_ids = await getAssignedMenus(userId);
        const newCheckedMenus = {};
        const newCheckedSubMenus = {};
        const menu_list = await fetchMenus();

        Object.values(menu_list).forEach((menu) => {
            newCheckedMenus[menu.id] = menuIds.includes(String(menu.id));

            menu.sub_menu.forEach((subMenu) => {
                newCheckedSubMenus[subMenu.id] =
                    menuIds.includes(String(subMenu.id));
            });

        });
        setCheckedMenus(newCheckedMenus);
        setCheckedSubmenus(newCheckedSubMenus);
    }

    function handleMenuChange(menu) {
        const isChecked = checkedMenus[menu.id];
        const subMenuIds = menu.sub_menu.map((subMenu) => {
            return subMenu.id;
        })

        if (!isChecked) {
            var result = subMenuIds.reduce((obj, id) => {
                obj[id] = true;
                return obj;
            }, {});
            setCheckedMenus({
                ...checkedMenus,
                [menu.id]: true
            });
            setCheckedSubmenus({
                ...checkedSubMenus,
                ...result
            });
        } else {
            var result = subMenuIds.reduce((obj, id) => {
                obj[id] = false;
                return obj;
            }, {});
            setCheckedMenus({
                ...checkedMenus,
                [menu.id]: false
            });
            setCheckedSubmenus({
                ...checkedSubMenus,
                ...result
            });
        }

    }

    function handleSubMenuChange(subMenu) {
        const isChecked = checkedSubMenus[subMenu.id];
        const parentMenu = menus[subMenu.parent_menu];

        // console.log(isChecked);
        // console.log(subMenu.id);
        const newCheckedSubmenus = {
            ...checkedSubMenus,
            [subMenu.id]: !isChecked
        };
        setCheckedSubmenus(newCheckedSubmenus);
        const submenuids = parentMenu.sub_menu.map(sub => sub.id);

        const haveCheckedChild = submenuids.some(id => newCheckedSubmenus[id]);
        setCheckedMenus({
            ...checkedMenus,
            [parentMenu.id]: haveCheckedChild
        });
    }
    // console.log(checkedMenus);
    let menuids = Object.keys(checkedMenus).filter((key: any) => checkedMenus[key]);
    let subMenuIds = Object.keys(checkedSubMenus).filter((key: any) => checkedSubMenus[key]);
    // console.log(menuids);
    // console.log(subMenuIds);


    async function handlesave() {
        setIsLoading(true);
        const savedMenu = {
            user_id: selectedUser,
            menu_ids: menuids.concat(subMenuIds)
        };
        // console.log(savedMenu);
        const result = await saveRights(savedMenu);
        // console.log(result);
        if (!result.error) {
            setIsLoading(false);
        }
        setResponse(result);
        setTimeout(() => {
            setResponse({});
        }, 2000);
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isCtrlKey = event.ctrlKey || event.metaKey;
            if (isCtrlKey && event.key.toLowerCase() === 's') {
                event.preventDefault();
                handlesave();
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [checkedMenus, checkedSubMenus, selectedUser])
    return (
        <div className="w-full">
            {/* User */}
            <ResponseMessage response={response} />

            <div className="w-full sm:w-60">
                <select
                    name="user"
                    id="user"
                    className="h-10 w-full rounded-md border border-gray-300 bg-white p-2"
                    onChange={(e) => handleUserChange(e)}
                >
                    <option value="">Select User</option>

                    {userlist.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>

            {selectedUser && (
                <div className="pt-5">
                    {isLoading ? (<div className="fixed inset-0 flex items-center justify-center bg-white/80">
                        <Loader />
                    </div>
                    ) : (
                        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            {Object.entries(menus).map(([key, menu]: any) => {

                                const submenu = menu?.sub_menu ?? [];

                                return (
                                    <div
                                        key={key}
                                        className="min-w-0 rounded-md border border-gray-300 bg-white p-4"
                                    >

                                        <div className="flex items-center">

                                            <label
                                                htmlFor={`menu-${menu.id}`}
                                                className="ml-2 break-words font-medium"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`menu-${menu.id}`}
                                                    name="menu"
                                                    value={menu.id}
                                                    className="h-4 w-4 mr-2"
                                                    checked={checkedMenus[menu.id] || false}
                                                    onChange={() => handleMenuChange(menu)}
                                                />

                                                {menu.label}
                                            </label>
                                        </div>

                                        {submenu.length > 0 && (
                                            <ul className="mt-3 ml-5 space-y-2 flex gap-5 flex-wrap">
                                                {submenu.map((subMenu: any) => (
                                                    <li
                                                        key={subMenu.id}
                                                        className=""
                                                    >
                                                        <label
                                                            htmlFor={`submenu-${subMenu.id}`}
                                                            className=" break-words text-sm "
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={`submenu-${subMenu.id}`}
                                                                name="submenu"
                                                                value={subMenu.id}
                                                                className="mr-2"
                                                                checked={checkedSubMenus[subMenu.id] || false}
                                                                onChange={() => handleSubMenuChange(subMenu)}
                                                            />
                                                            {subMenu.label}
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                    </div>
                                );
                            })}

                        </div>)
                    }

                </div>
            )}
        </div>
    );
}