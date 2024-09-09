import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {parseToken} from "@/lib/utils/token";

export async function middleware(req: NextRequest) {
    const session = req.cookies.get('session')?.value;

    if (!session) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const user = parseToken(session);

        if (!user) {
            console.error('Session decryption failed: No user found');
            return NextResponse.redirect(new URL('/login', req.url));
        }

        return NextResponse.next({
            request: {
                headers: req.headers
            }
        });
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
