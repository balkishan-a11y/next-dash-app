'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function Form({ createMenu }) {
    return (
        <form action={createMenu}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className='flex gap-2 flex-wrap'>
                    <div className="mb-1 w-72">
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">
                            Page Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter page name"
                            className="peer block w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-1 w-80">
                        <label htmlFor="" className="mb-2 block text-sm font-medium">
                            Status
                        </label>
                        <select name="status" id="status" className="peer block w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required>
                            <option value="" disabled defaultValue="">Select a status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>
                    <div className="mb-1 w-80">
                        <label htmlFor="" className="mb-2 block text-sm font-medium">
                            Type
                        </label>
                        <select name="type" id="type" className="peer block w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required>
                            <option value="" disabled >Select a type</option>
                            <option value="1">Menu</option>
                            <option value="0">Sub Menu</option>
                        </select>
                    </div>
                    <div className="mb-1 w-60">
                        <label htmlFor="icon" className="mb-2 block text-sm font-medium">
                            Icon
                        </label>
                        <input
                            id="icon"
                            name="icon"
                            type="text"
                            placeholder="Enter icon"
                            className="peer block w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-1 w-60">
                        <label htmlFor="parent_menu" className="mb-2 block text-sm font-medium">
                            Parent Menu
                        </label>
                        <input
                            id="parent_menu"
                            name="parent_menu"
                            type="text"
                            placeholder="Enter parent menu"
                            className="peer block w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/menus/listing"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create menu</Button>
            </div>
        </form>
    );
}
