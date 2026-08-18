'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete user');
  }
  revalidatePath('/dashboard/users');
}
