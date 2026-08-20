
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import Dashboard from './dashboard';

export default async function Page() {
    const user = await getCurrentUser();
    if (!user) {
        redirect('/login');
    }
    return <Dashboard />
} 