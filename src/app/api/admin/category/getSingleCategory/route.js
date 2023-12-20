import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import subCategoryModel from '@/models/subCategory'


export const dynamic = "force-dynamic";


export async function POST(req) {
    await connectToDb();

    // middleware to check user logged in or is a admin
    const id = await req.json();


        try {

            const subCategory = await subCategoryModel.findById(id);
            if (subCategory) {
                return NextResponse.json({
                    subCategory,
                    success: true,
                    message: "Sub Category fetched successfully",
                });
            }
            return NextResponse.json({
                success: false,
                message: "Error while getting Sub category. Please try again",
            });

        } catch (error) {
            console.log("Error while getting Sub category. Please try again");

            return NextResponse.json({
                success: false,
                message: "Error while getting Sub category. Please try again",
            });
        }

    }
