import connectToDb from '@/database/index';
import User from '@/models/user';
import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export const dynamic = "force-dynamic";

export async function POST(req) {
    await connectToDb();

    const { email, password } = await req.json();
    console.log(email)
    console.log('1')
    if (!email || !password) {
        return NextResponse.json({
            success: false,
            message: "Please fill all required fields",
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({
                success: false,
                message: "User does not exist. Please sign in",
            });
        }

        const checkPassword = await compareSync(password, existingUser.password);
        if (!checkPassword) {
            return NextResponse.json({
                success: false,
                message: "Wrong Password or Email. Please use valid details.",
            });
        }

        const token = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        cookies().set({
            name: 'access_token',
            value: token,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path:'/'
        })


        return NextResponse.json({
            success: true,
            message: "Login successful",
            user: {
                email: existingUser.email,
                name: existingUser.name,
                id: existingUser._id,
                role: existingUser.role,
            },
            token:token,
        });
    } catch (error) {
        console.error("Error while logging in. Please try again.", error);

        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again later.",
        });
    }
}
