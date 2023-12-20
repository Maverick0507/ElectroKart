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

    if (!name || !parentCategory || !photos) {
        return NextResponse.json({
            success: false,
            message: "Please fill all required fields",
        });
    }

    try {
        const existingCategory = await ProductSubCategory.findOne({ name });

        if (existingCategory) {
            const updatedCategory = await ProductSubCategory.findOneAndUpdate(
                { name },
                { name, parentCategory, photos },
                { new: true }
            );

            if (updatedCategory) {
                return NextResponse.json({
                    success: true,
                    message: "SubCategory updated successfully.",
                });
            }

        }
    } catch (error) {
        console.error("Error while updating a new SubCategory. Please try again", error);

        return NextResponse.json({
            success: false,
            message: "Error while updating a  SubCategory. Please try again",
        });
    }
}
