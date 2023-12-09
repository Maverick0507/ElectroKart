import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import ProductCategory from '@/models/category'
import AuthUser from '@/middleware/AuthUser';


export const dynamic = "force-dynamic";


export async function DELETE(req) {
    await connectToDb();

    const isAuthUser = await AuthUser(req)
    if (isAuthUser.role === 'admin') {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({
                success: false,
                message: " Product not found",
            });
        }

        try {
            const deleteCategory = await ProductCategory.findByIdAndDelete(id)
            if (deleteCategory) {
                return NextResponse.json({
                    success: true,
                    message: "Category deleted successfully",
                });
            }

            return NextResponse.json({
                success: false,
                message: "error  occurred while deleting category",
            });

        } catch (error) {
            console.log("Error while deleteing  category. Please try again");

            return NextResponse.json({
                success: false,
                message: "Error while deleteing  category. Please try again",
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
