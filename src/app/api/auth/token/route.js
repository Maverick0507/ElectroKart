
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export const dynamic = "force-dynamic";

export async function GET(req) {

    try {
        const cookieStore = cookies()
        const token = cookieStore.get('access_token')

        if (token) {
            return NextResponse.json({
                success: true,
                message: "cookie found successful",
                token: token,
            });
        }
        return NextResponse.json({
            success: false,
            message: "cookie not found ",
            token: null,
        });
    } catch (error) {
        console.error("Error user is not logged in not cokkie found .", error);

        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again later.",
        });
    }
}
