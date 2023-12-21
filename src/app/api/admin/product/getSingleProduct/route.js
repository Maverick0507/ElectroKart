import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import ProductModel from '@/models/product'


export const dynamic = "force-dynamic";


export async function POST(req) {
    await connectToDb();

    const productId = await req.json()
    console.log(productId)
    try {
        const Product = await ProductModel.findById(productId)
        if (Product) {
            return NextResponse.json({
                Product,
                success: true,
                message: "Product fetched successfully",
            });
        }
        return NextResponse.json({
            success: false,
            message: "Error while getting  Product. Please try again",
        });

    } catch (error) {
        console.log("Error while getting Product. Please try again");

        return NextResponse.json({
            success: false,
            message: "Error while getting Product. Please try again",
        });
    }


}
