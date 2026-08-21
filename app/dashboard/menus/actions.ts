'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { Role } from '@/app/generated/prisma/enums';

export async function deleteMenu(id: string) {
  try {
    await prisma.menu.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete menu');
  }
  revalidatePath('/dashboard/menus/listing');
}
export async function createMenu(formData: FormData) {
  const rawData = {
    name: formData.get('name')?.toString().toLowerCase(),
    icon: formData.get('icon')?.toString().toLowerCase(),
    parent_menu: formData.get('parent_menu')?.toString().toLowerCase(),
    status: formData.get('status')?.toString(),
    type: formData.get('type')?.toString(),
  };
  console.log(rawData);
  let path = '';
  if (rawData.parent_menu == '') {
    path = '/' + rawData.name?.replace(' ', '_') as string;
  } else {
    path = '/' + rawData.parent_menu?.replace(' ', '_') + '/' + rawData.name?.replace(' ', '_') as string;
  }
  try {
    await prisma.menu.create({
      data: {
        name: rawData.name as string,
        path: path,
        icon: rawData.icon as string,
        parent_menu: rawData.parent_menu as string,
        status: rawData.status as string,
        type: rawData.type as string,
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create Menu');
  }

  revalidatePath('/dashboard/menus/listing');
  redirect('/dashboard/menus/listing');
}
export async function updateMenu(id: string, formData: FormData) {
  const rawData = {
    name: formData.get('name')?.toString().toLowerCase(),
    path: formData.get('path')?.toString().toLowerCase(),
    icon: formData.get('icon')?.toString().toLowerCase(),
    parent_menu: formData.get('parent_menu')?.toString().toLowerCase(),
    status: formData.get('status')?.toString(),
    type: formData.get('type')?.toString(),

  };
  console.log(rawData);
  let path = '';
  if (rawData.parent_menu == '') {
    path = '/' + rawData.name?.replace(' ', '_') as string;
  } else {
    path = '/' + rawData.parent_menu?.replace(' ', '_') + '/' + rawData.name?.replace(' ', '_') as string;
  }
  try {
    let savedata = {
      name: rawData.name as string,
      path: path as string,
      icon: rawData.icon as string,
      parent_menu: rawData.parent_menu as string,
      status: rawData.status as string,
      type: rawData.type as string,
    }
    await prisma.menu.update({
      where: {
        id: Number(id),
      },
      data: savedata,
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update Menu');
  }

  revalidatePath('/dashboard/menus/listing');
  redirect('/dashboard/menus/listing');
}
