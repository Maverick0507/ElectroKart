import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import ProductCategory from '@/models/category'
import AuthUser from '@/middleware/AuthUser';


export const dynamic = "force-dynamic";


export async function POST(req) {
    await connectToDb();

    // middleware to check user logged in or is a admin
    const limit = await req.json();
    console.log(limit)

    const isAuthUser = await AuthUser(req)

        try {

            const AllCategory = await ProductCategory.find({}).limit(limit)
            if (AllCategory) {
                return NextResponse.json({
                    AllCategory,
                    success: true,
                    message: "Category fetched successfully",
                });
            }
            return NextResponse.json({
                success: false,
                message: "Error while getting all category. Please try again",
            });

        } catch (error) {
            console.log("Error while getting all category. Please try again");

            return NextResponse.json({
                success: false,
                message: "Error while getting all category. Please try again",
            });
        }

    }
