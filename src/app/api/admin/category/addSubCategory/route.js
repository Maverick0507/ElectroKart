import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import ProductSubCategory from '@/models/subCategory'
import AuthUser from '@/middleware/AuthUser';

export const dynamic = "force-dynamic";

export async function POST(req) {
    await connectToDb();

    // middleware to check user logged in or is an admin
    const authUser = await AuthUser(req);

    if (authUser.role !== 'admin') {
        return NextResponse.json({
            success: false,
            message: "Not Authorized",
        });
    }

    const { name, parentCategory, photos } = await req.json();

    if (!name || !parentCategory) {
        return NextResponse.json({
            success: false,
            message: "Please fill all required fields",
        });
    }

    try {
        const existingSubCategory = await ProductSubCategory.findOne({ name });

        if (existingSubCategory) {
            return NextResponse.json({
                success: false,
                message: "SubCategory already exists",
            });
        }

        const newSubCategory = await ProductSubCategory.create({ name, parentCategory,photos });

        if (newSubCategory) {
            return NextResponse.json({
                success: true,
                message: "SubCategory added successfully.",
            });
        }

    } catch (error) {
        console.error("Error while adding a new SubCategory. Please try again", error);

        return NextResponse.json({
            success: false,
            message: "Error while adding a new SubCategory. Please try again",
        });
    }
}
