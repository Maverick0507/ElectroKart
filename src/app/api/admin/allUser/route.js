import connectToDb from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";



export const dynamic = "force-dynamic";

export async function GET(res) {
    try {
        await connectToDb()
        const users = await User.find({})
        if (users) {
            return NextResponse.json({
                success: true,
                message: "All users fetched successfully",
                users
            })
        }
        else {
            return NextResponse.json({
                success: false,
                message: "Failed to get users",
            })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "internal server error occurred while etching users",
        })
    }
}