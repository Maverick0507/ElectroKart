import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import ProductCategory from '@/models/category'
import AuthUser from '@/middleware/AuthUser';


export const dynamic = "force-dynamic";


export async function POST(req) {
    await connectToDb();

    // middleware to check user logged in or is a admin
    const isAuthUser = await AuthUser(req)
    if (isAuthUser.role === 'admin') {
        const name = await req.json();
        if (!name) {
            return NextResponse.json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        try {

            const existingCategory = await ProductCategory.findOne({ name })
            if (existingCategory) {
                return NextResponse.json({
                    success: false,
                    message: "Category already exists",
                });
            }


            const newCategory = await ProductCategory.create({ name })
            if (newCategory) {
                return NextResponse.json({
                    success: true,
                    message: "Category added successfully.",
                });
            }

        } catch (error) {
            console.log("Error while adding new category. Please try again");

            return NextResponse.json({
                success: false,
                message: "Error while adding new category. Please try again",
            });
        }

    }

    else {
        return NextResponse.json({
            success: false,
            message: "Not Authorized",
        });
    }


}
