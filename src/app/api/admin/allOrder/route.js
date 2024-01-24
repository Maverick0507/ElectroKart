import connectToDb from "@/database";
import productOrder from "@/models/productOrder";
import { NextResponse } from "next/server";



export const dynamic = "force-dynamic";

export async function GET(res) {
    try {
        await connectToDb()
        const orders = await productOrder.find({})
            .populate('products')
            .populate("buyer","-password")
        if (orders) {
            return NextResponse.json({
                success: true,
                message: "All users fetched successfully",
                orders
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
            message: "internal server error occurred while fetching orders",
        })
    }
}