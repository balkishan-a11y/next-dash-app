import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/lib/auth';
import LoginForm from './login-form';

export default async function Page() {
    const user = await getCurrentUser();

    if (user) {
        redirect('/dashboard');
    }

    return <LoginForm />;
}