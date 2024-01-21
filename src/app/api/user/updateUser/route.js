import connectToDb from '@/database/index';
import User from '@/models/user';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDb();
        
        const { email, name, address ,password } = await req.json();

        // Check if the user exists
        const user = await User.findOne({ email });
      
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            });
        }

      
        const hashedPassword = password ? await hash(password,10):undefined
        
         // Update user details
        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    name: name || user.name,
                    email: email || user.email,
                    address: address || user.address,
                    password: hashedPassword || user.password
                },
            },
            { new: true }
        );


        return NextResponse.json({
            success: true,
            message: "Details updated successfully",
             updatedUser
        });
    } catch (error) {
        console.error("Error while updating. Please try again", error);

        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again later",
        });
    }
}
