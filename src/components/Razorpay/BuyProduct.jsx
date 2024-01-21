"use client";
import React, { Suspense } from "react";
import { useRouter } from 'next/navigation';
import Buy from "./Buy";
import Loading from "@/app/loading";
import { productPayment, productPaymentVerify } from "@/services/payment";
import { useAuth } from "@/context/authContext";



const BuyProduct = () => {

    const router = useRouter()
    const amount = 20000
    const [auth] = useAuth()


    const makePayment = async ({ productId = null }) => {
        // "use server"
        if (auth.user === null || auth === null) {
            alert("please login to continue")
            return
        }

        const key = process.env.RAZORPAY_API_KEY;
        // Make API call to the serverless API
        const { data } = await productPayment({ amount });
        const { order } = data
        const options = {
            key: 'rzp_test_tQuwaOCoxqfzFs',
            name: "Electromart",
            currency: order.currency,
            amount: order.amount,
            order_id: order.id,
            description: "Understanding RazorPay Integration",
            // handler: async function (response) {
            //     const { data } = await productPaymentVerify({
            //         razorpay_payment_id: response.razorpay_payment_id,
            //         razorpay_order_id: response.razorpay_order_id,
            //         razorpay_signature: response.razorpay_signature,
            //     })


            //     // const data = await fetch("http://localhost:3000/api/paymentverify", {
            //     //     method: "POST",
            //     //     // headers: {
            //     //     //   // Authorization: 'YOUR_AUTH_HERE'
            //     //     // },
            //     //     body: JSON.stringify({
            //     //         razorpay_payment_id: response.razorpay_payment_id,
            //     //         razorpay_order_id: response.razorpay_order_id,
            //     //         razorpay_signature: response.razorpay_signature,
            //     //     }),
            //     // });



            //     const res = await data.json();

            //     console.log("response verify==", res)

            //     if (res?.message == "success") {


            //         console.log("redirected.......")
            //         router.push("/paymentsuccess?paymentid=" + response.razorpay_payment_id)

            //     }

            //     // Validate payment at server - using webhooks is a better idea.
            //     // alert(response.razorpay_payment_id);
            //     // alert(response.razorpay_order_id);
            //     // alert(response.razorpay_signature);
            // },
            prefill: {
                name: "ElectroMart",
                email: "ElectroMart@gmail.com",
                contact: "123123123",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        paymentObject.on("payment.failed", function (response) {
            alert("Payment failed. Please try again. Contact support for help");
        });
    };

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Buy makePayment={makePayment} />
            </Suspense>
        </>
    );
};

export default BuyProduct;