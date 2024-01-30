import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import ProductModel from '@/models/product';

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        // Ensure that the database connection is established before proceeding
        await connectToDb();

        const { newMinValue, newMaxValue,subCategoryId } = await req.json();

        const Product = await ProductModel
            .find({
                // Assuming 'price' is the field in your ProductModel representing the product price
                category:subCategoryId,
                price: { $gte: newMinValue, $lte: newMaxValue }
            })

        if (Product.length > 0) {
            return NextResponse.json({
                Product,
                success: true,
                message: "Products fetched successfully based on price range",
            });
        }

        return NextResponse.json({
            success: false,
            message: "No products found for the given price range",
        });
    } catch (error) {
        console.error("Error while getting products:", error.message);

        return NextResponse.json({
            success: false,
            message: "Error while getting products. Please try again",
        });
    }
}
