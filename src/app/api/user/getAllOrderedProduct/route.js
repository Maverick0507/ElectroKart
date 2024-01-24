import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import orderModel from '@/models/productOrder';

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        // Ensure the incoming request is a POST request
        if (req.method !== 'POST') {
            return NextResponse.json({
                success: false,
                message: "Invalid request method. Expected POST.",
            });
        }

        // Assuming that req.body is the correct property to get the JSON payload
        const  uid  = await  req.json();

        if (!uid) {
            return NextResponse.json({
                success: false,
                message: "Missing 'uid' parameter in the request body.",
            });
        }

        await connectToDb();

        const orders = await orderModel
            .find({ buyer: uid })
            .populate("products")
            .populate("buyer", "name")

        return NextResponse.json({
            success: true,
            message: "All orders fetched successfully",
            orders,
        });
    } catch (error) {
        console.error("Error while fetching order:", error);

        return NextResponse.json({
            success: false,
            message: "Error while fetching orders.",
        });
    }
}
