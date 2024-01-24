"use client";
import React, { Suspense, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";

import Buy from "./Buy";
import Loading from "@/app/loading";
import { productPayment } from "@/services/payment";
import { orderPaymentFinal } from '@/services/orderPaymentFinal'
import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import { userUpdate } from "@/services/user";



const BuyProduct = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [userAdress, setUserAdress] = useState({})


    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const amount = cart.reduce((acc, item) => acc + item.totalPrice, 0);

    const addAddress = async () => {
        try {
            const { data } = await userUpdate({ email: auth.user.email, address: userAdress })
            if (data.success) {
                setAuth({ ...auth, user: { ...auth.user, address: userAdress } }); // Update the address in the authentication context
                console.log(auth);
                alert('Address updated successfully');
            }
        } catch (error) {
            console.log(error)
        }
    }


    const makePayment = async ({ productId = null }) => {
        // "use server"
        if (auth.user === null || auth === null) {
            alert("please login to continue")
            return
        }
        else {
            if (auth.user.address === null || auth === null) {
                onOpen()
                return
            }
        }


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

        if (data.msg === 'success') {
            const { data } = await orderPaymentFinal({ cart, buyer: auth?.user?.id });
            if (data.success) {
                localStorage.removeItem('cart');
                setCart([]);
            }
        }

    };

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Buy makePayment={makePayment} />
            </Suspense>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    Enter delivery address
                                </p>
                                <form className=' '>
                                    <input
                                        className=' border-2 outline-none h-10 rounded-md p-4 w-full mb-2'
                                        type="text"
                                        placeholder='House no.'
                                        onChange={(e) => setUserAdress(e.target.value)}
                                    />

                                </form>

                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={addAddress} color="success" variant="light" onPress={onClose}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default BuyProduct;