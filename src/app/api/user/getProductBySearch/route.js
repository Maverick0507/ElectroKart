import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import ProductModel from '@/models/product';

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        // Ensure that the database connection is established before proceeding
        await connectToDb();

        const keyword = await req.json();

        const Product = await ProductModel
            .find({
                $or: [
                    { productName: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                ],
            })
            .select("-photo");

       
        if (Product.length > 0) {
            return NextResponse.json({
                Product,
                success: true,
                message: "Product fetched successfully",
            });
        }

        return NextResponse.json({
            success: false,
            message: "No products found for the given keyword",
        });
    } catch (error) {
        console.error("Error while getting Product:", error.message);

        return NextResponse.json({
            success: false,
            message: "Error while getting Product. Please try again",
        });
    }
}
