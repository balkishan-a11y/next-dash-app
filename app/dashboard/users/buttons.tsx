import Link from 'next/link';
import { deleteUser } from './actions';

export function CreateUser() {
  return (
    <Link
      href="/dashboard/users/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create User</span>{' '}
      <i className="fa-solid fa-plus h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateUser({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/users/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <i className="fa-solid fa-pencil w-5 text-center" />
    </Link>
  );
}

export function DeleteUser({ id }: { id: string }) {
  const deleteUserWithId = deleteUser.bind(null, id);
  return (
    <form action={deleteUserWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <i className="fa-solid fa-trash w-5 text-center" />
      </button>
    </form>
  );
}
