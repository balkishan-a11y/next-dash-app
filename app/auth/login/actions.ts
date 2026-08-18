'use server';

import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { error: true, message: 'Please Enter valid credentials.' };
  }
  const userExist = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });

  if (!userExist) {
    return { error: true, message: 'User does not exist.' };
  }

  const isvalid = await bcrypt.compare(password as string, userExist.password);
  if (!isvalid) {
    return { error: true, message: 'Invalid Password.' };
  } else {
    const cookieStore = await cookies();
    cookieStore.set('session', userExist.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return redirect('/dashboard');
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  revalidatePath('/auth/login');
  redirect('/auth/login');
}
