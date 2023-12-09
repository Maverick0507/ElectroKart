import connectToDb from '@/database/index';
import User from '@/models/user';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function POST(req) {
    await connectToDb()
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
        return NextResponse.json({
            success: false,
            message: "Please fill all required fields"
        })
    }

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await hash(password, 10)

        const newUser = await User.create({
            name, email, password: hashedPassword,
        })

        if (newUser) {
            return NextResponse.json({
                success: true,
                message: "Account created successfully.",
            });
        }
    } catch (error) {
        console.log("Error while new user registration. Please try again");

        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}