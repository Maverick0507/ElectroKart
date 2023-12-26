import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import ProductModel from '@/models/product'


export const dynamic = "force-dynamic";


export async function GET(req) {
    await connectToDb();

    try {
        const Product = await ProductModel.find({}).limit(10)
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
