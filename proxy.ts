import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { canAccess } from './app/auth/login/actions';

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const dbPath = pathname.replace('/dashboard', '');
    const session = request.cookies.get('session');

    const userId = session?.value;
    if (!userId) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const access = await canAccess(userId, dbPath);
    if (!access) {
        return NextResponse.redirect(new URL('/access-denied', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};