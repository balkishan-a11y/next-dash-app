'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createUser } from './actions';

export default function Form() {
    return (
        <form action={createUser}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className='flex gap-2 flex-wrap'>
                    <div className="mb-1 w-72">
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter name"
                            className="peer block w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-1 w-80">
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            className="peer block w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-1 w-60">
                        <label htmlFor="password" className="mb-2 block text-sm font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            className="peer block w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-1 w-60">
                        <label htmlFor="role" className="mb-2 block text-sm font-medium">
                            Select Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            className="peer block w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        >
                            <option value="" disabled defaultValue="">Select a role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="USER">User</option>
                            <option value="EMPLOYEE">Employee</option>
                            <option value="MANAGER">Manager</option>
                        </select>
                    </div>
                </div>

            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/users/listing"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create user</Button>
            </div>
        </form>
    );
}
