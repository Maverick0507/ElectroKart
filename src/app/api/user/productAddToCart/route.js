import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import ProductCart from '@/models/cart';
import ProductSchema from '@/models/product'

export const dynamic = "force-dynamic";

export async function POST(req) {
    await connectToDb();
    const { product_id, quantity,color,price } = await req.json();

    if (!product_id || !quantity || !price || !color || productName ) {
        return NextResponse.json({
            success: false,
            message: "Please fill all details",
        });
    }


    try {
        const existingProduct = await ProductSchema.findById(product_id);
        if (existingProduct) {
            if (quantity > 0) {
                const cartItem = await ProductCart.create({
                     product_id, 
                     quantity:90,
                      color,
                       price,
                       productName
                      
                    });
                if (cartItem) {
                    return NextResponse.json({
                        success: true,
                        cartItem,
                        message: "Product added to cart",
                    });
                }
            } else {
                return NextResponse.json({
                    success: true,
                    message: "Quantity is 0. Add at least 1 quantity to continue",
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "Adding product to cart failed",
            });
        }
    } catch (error) {
        console.error("Error while adding product to cart. Please try again", error);

        return NextResponse.json({
            success: false,
            message: "Error while adding product to cart. Please try again ",
        });
    }
}
