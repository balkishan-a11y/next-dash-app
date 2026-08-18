'use server';
import { z } from 'zod';
import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '../generated/prisma/internal/prismaNamespace';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    try {
        const amountInCents = amount * 100;
        const date = new Date();
        await prisma.invoice.create({
            data: {
                customer_id: customerId,
                amount: amountInCents,
                status: status,
                date: date,
            },
        });

    } catch (error) {
        throw new Error('Failed to create invoice');
    }
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices');


    // Test it out:
    // console.log(date);
}
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    try {
        const amountInCents = amount * 100;

        await prisma.invoice.update({
            where: {
                id: id,
            },
            data: {
                customer_id: customerId,
                amount: amountInCents,
                status: status,
            },
        });

    } catch (error) {
        throw new Error('Failed to update invoice');
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}
export async function deleteInvoice(id: string) {
    throw new Error('Failed to delete invoice');

    try {
        await prisma.invoice.delete({
            where: {
                id: id,
            },
        })
    } catch (error) {
        throw new Error('Failed to delete invoice');
    }
    revalidatePath('/dashboard/invoices');
}

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        return { error: true, message: 'Please Enter valid credentials.' }
    }
    const userExist = await prisma.user.findUnique({
        where: {
            email: email as string,
        },
    });
    // console.log("userExist", userExist);

    if (!userExist) {
        return { error: true, message: 'You does not exist.' }
    }

    const isvalid = await bcrypt.compare(password, userExist.password);
    if (!isvalid) {
        return { error: true, message: 'Invalid Password.' }
    } else {
        const cookieStore = await cookies();
        cookieStore.set('session', userExist.id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        })
        return redirect('/dashboard');
    }

    // const bcrypt = await
    // return {
    //     error: false,
    //     message: 'Login successful.'
    // }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    revalidatePath('/auth/login');
    redirect('/auth/login');
}