import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = "force-dynamic";

export async function GET(req) {
    cookies().delete('access_token')
    return NextResponse.json({
        success: true,
        message: 'Logout successful',
    });
}
