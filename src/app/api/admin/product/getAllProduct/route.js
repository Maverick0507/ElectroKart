import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import ProductModel from '@/models/product'


export const dynamic = "force-dynamic";


export async function POST(req) {
    await connectToDb();

    const subCategoryId = await req.json();
    try {

        const AllProduct = await ProductModel.find({ category:subCategoryId })
        if (AllProduct) {
            return NextResponse.json({
                AllProduct,
                success: true,
                message: "AllProduct fetched successfully",
            });
        }
        return NextResponse.json({
            success: false,
            message: "Error while getting  AllProduct. Please try again",
        });

    } catch (error) {
        console.log("Error while getting AllProduct. Please try again");

        return NextResponse.json({
            success: false,
            message: "Error while getting AllProduct. Please try again",
        });
    }


}
