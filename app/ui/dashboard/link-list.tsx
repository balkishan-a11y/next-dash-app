'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function LinkList({ menu_links }: any) {
    const pathname = usePathname();

    const [openMenu, setOpenMenu] = useState<string | null>(null);

    return (
        <>
            {Object.entries(menu_links).map(([menuName, link]: any) => {
                const subMenus = link?.sub_menu ?? [];

                const isOpen = openMenu === menuName;

                return (
                    <div key={menuName} className="bg-gray-50">

                        {/* Parent menu */}
                        <div className="flex items-center" onClick={() =>
                            setOpenMenu(
                                isOpen ? null : menuName
                            )
                        }
                        >

                            <div

                                className={`flex h-[48px] grow items-center gap-2 rounded-md p-3 text-sm font-medium  md:justify-start md:p-2 md:px-3 `}
                            >
                                <i
                                    className={`fa-solid ${link.icon} w-6 text-center`}
                                />

                                <p className="hidden md:block">
                                    {link?.label}
                                </p>
                            </div>

                            {subMenus.length > 0 && (
                                <button
                                    type="button"

                                    className="mr-3 hidden md:block"
                                >
                                    <i
                                        className={`fa-solid ${isOpen
                                            ? 'fa-chevron-down'
                                            : 'fa-chevron-right'
                                            }`}
                                    />
                                </button>
                            )}
                        </div>

                        {isOpen && subMenus.length > 0 && (
                            <div className="ml-5">
                                {subMenus.map((subMenu: any) => (
                                    <Link
                                        key={subMenu.label}
                                        href={
                                            subMenu.label === 'home'
                                                ? '/'
                                                : subMenu.href
                                        }
                                        className={`flex h-[44px] items-center gap-2 rounded-md p-3 text-sm hover:bg-sky-100 hover:text-blue-600 ${pathname === subMenu.href
                                            ? 'bg-sky-100 text-blue-600'
                                            : ''
                                            }`}
                                    >
                                        <i
                                            className={`fa-solid ${subMenu.icon} w-6 text-center`}
                                        />

                                        <p className="hidden md:block">
                                            {subMenu.label}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        )}

                    </div>
                );
            })}
        </>
    );
}