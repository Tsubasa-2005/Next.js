import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = cookies();

    cookieStore.set('session', '', {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
        path: '/',
    });

    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
}