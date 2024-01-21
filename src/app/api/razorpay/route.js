import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
import Payment from "@/models/payment";
import connectToDb from "@/database/index";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});

export async function POST(req) {
    await connectToDb();

    try {
        var { amount } = await req.json();
        amount = amount * 100;

        const payment_capture = 1;
        const currency = "INR";
        const options = {
            amount: amount.toString(),
            currency,
            receipt: shortid.generate(),
            payment_capture,
            notes: {
                paymentFor: "testingDemo",
                userId: "100",
                productId: 'P100'
            }
        };

        const order = await instance.orders.create(options);

        // Save payment information to the database
        await Payment.create({
            razorpay_order_id: order.id,
            // If you need to store these values, you should fetch them from the webhook or the Razorpay API response.
            // For now, I'm assuming you'll get them from the response.
            razorpay_payment_id: 'your_payment_id', // Replace with the actual payment ID
            razorpay_signature: 'your_signature' // Replace with the actual signature
        });

        return NextResponse.json({ msg: "success", order });
    } catch (error) {
        return NextResponse.json({ msg: "Failure" });
    }
}
