import connectToDb from '@/database/index';
import OrderModel from '@/models/productOrder';
import { NextResponse } from 'next/server';

export async function POST(req) {
    connectToDb();

    try {
        const { cart, buyer } = await req.json();
        const productIds = cart.map((item) => item.productId);

        const totalPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);


        const order = new OrderModel({
            products: productIds,
            buyer,
            price:totalPrice,
        });

        await order.save();
        return NextResponse.json({
            success: true,
            message: "Order placed",
        });

    } catch (error) {
        console.error("Error while placing order:", error);
        return NextResponse.json({
            success: false,
            message: "Error while placing order",
        });
    }
}
