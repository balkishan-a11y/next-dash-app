import prisma from '@/app/lib/prisma';
import { UsersTableType } from './types';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredUsers(
  query: string,
  currentPage: number,
): Promise<UsersTableType[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchUsersPages(query: string): Promise<number> {
  try {
    const count = await prisma.user.count({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of users.');
  }
}
export async function fetchUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user.');
  }
}
