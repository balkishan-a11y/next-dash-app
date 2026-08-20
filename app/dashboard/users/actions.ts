'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { Role } from '@/app/generated/prisma/enums';

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
export async function createUser(formData: FormData) {
  const rawData = {
    name: formData.get('name')?.toString(),
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
    role: formData.get('role')?.toString(),
  };
  try {
    const password = await bcrypt.hash(rawData.password as string, 10);
    const date = new Date();
    await prisma.user.create({
      data: {
        username: rawData.name as string,
        email: rawData.email as string,
        password: password,
        role: rawData.role as Role,
        createdAt: date,
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create User');
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}
export async function updateUser(id: string, formData: FormData) {
  const rawData = {
    name: formData.get('name')?.toString(),
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
    role: formData.get('role')?.toString(),
  };

  try {
    const password = await bcrypt.hash(rawData.password as string, 10);
    console.log("Hashing: ", password);
    let savedata = {};
    if (password) {
      savedata = {
        username: rawData.name as string,
        email: rawData.email as string,
        password: password ? password : undefined,
        role: rawData.role as Role,
      }
    } else {
      savedata = {
        username: rawData.name as string,
        email: rawData.email as string,
        role: rawData.role as Role,
      }
    }
    await prisma.user.update({
      where: {
        id: id,
      },
      data: savedata,
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update User');
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}
