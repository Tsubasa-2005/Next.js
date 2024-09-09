import { NextResponse } from 'next/server';
import { login } from '@/api/login';
import {setCookie} from "@/lib/utils/cookie"; // 既存のlogin関数

export async function POST(request: Request) {
    await setCookie("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF0UVhaSVJAUXZMaXZXSC5pbmZvIiwiZXhwIjoxNzI1ODU3NjA1LCJpZCI6NTMsImxvZ2luX3R5cGUiOiJlbWFpbCIsIm5hbWUiOiJEci4gR2lsYmVydG8gU3RhbW0iLCJzdWIiOiJEYXRhVG9SZXBvcnRBUEkifQ.OIJOPac8c6JhRB1drMw_wdK9GTbLtIKT6bFaMvo8-8g")
    try {
        const { user_id, password } = await request.json();

        const result = await login(user_id, password);

        if (result === null) {
            const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1時間後に期限切れ

            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            // ログイン失敗時のレスポンス
            return NextResponse.json({ error: result.error }, { status: 400 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}