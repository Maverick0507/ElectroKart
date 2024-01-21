import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "@/models/payment";
import connectToDb from "@/database/index";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});

export async function POST(req) {
    await connectToDb();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        await req.json();

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        console.log(Payment);

        // Assuming dbConnect is the correct function for connecting to the database
        await connectToDb();

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        return NextResponse.redirect(new URL('/paymentSuccess', req.url));
    } else {
        return NextResponse.json({
            message: "fail"
        }, {
            status: 400,
        });
    }
}
