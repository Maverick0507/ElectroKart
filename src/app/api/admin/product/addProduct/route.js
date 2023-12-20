import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import product from '@/models/product'
import AuthUser from '@/middleware/AuthUser';


export const dynamic = "force-dynamic";


export async function POST(req) {
    await connectToDb();

    // middleware to check user logged in or is a admin
    const isAuthUser = await AuthUser(req)
    if (isAuthUser.role === 'admin') {
        const { productName, description, price, discountedPrice, colors, onSale, quantity, category,photos } = await req.json();
        if (!productName || !description || !price || !discountedPrice || !colors || !onSale || !category ) {
            return NextResponse.json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        try {

            const existingProduct = await product.findOne({ productName })
            if (existingProduct) {
                return NextResponse.json({
                    success: false,
                    message: "product already exists",
                });
            }
           console.log(category)
            const newProduct = await product.create({
                productName,
                description,
                price,
                quantity,
                discountedPrice,
                colors: colors.split(',').map(color => color.trim()),
                onSale,
                category,
                photos
            })
           
          
            if (newProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Product added successfully.",
                    newProduct
                });
            }

        } catch (error) {
            console.log("Error while adding new Product. Please try again", error);

            return NextResponse.json({
                success: false,
                message: "Error while adding new Product. Please try again"
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
