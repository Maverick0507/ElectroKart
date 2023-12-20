import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import ProductSubCategory from '@/models/subCategory'
import AuthUser from '@/middleware/AuthUser';


export const dynamic = "force-dynamic";


export async function POST(req) {
    await connectToDb();

    // middleware to check user logged in or is a admin
   
        const {parentCategory,limit} = await req.json();
        try {

            const AllCategory = await ProductSubCategory.find({parentCategory}).limit(limit)
            if (AllCategory) {
                return NextResponse.json({
                    AllCategory,
                    success: true,
                    message: "sub Category fetched successfully",
                });
            }
            return NextResponse.json({
                success: false,
                message: "Error while getting all sub category. Please try again",
            });

        } catch (error) {
            console.log("Error while getting all sub category. Please try again");

            return NextResponse.json({
                success: false,
                message: "Error while getting all sub category. Please try again",
            });
        }

    }

  