import axios from "axios";

// productPayment function
export const productPayment = async ({amount}) => {
    try {
        const res = await axios.post('/api/razorpay', { amount },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        return res;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};


// // productPayment function
// export const productPaymentVerify = async ({razorpay_payment_id,razorpay_order_id,razorpay_signature}) => {
//     try {
//         const res = await axios.post('/api/paymentVerify', { razorpay_payment_id,razorpay_order_id,razorpay_signature },
//             {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//         return res;
//     } catch (error) {
//         console.error("Error:", error);
//         throw error;
//     }
// };
