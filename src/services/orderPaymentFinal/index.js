import axios from "axios";

// productPayment function
export const orderPaymentFinal = async ({ cart,buyer }) => {
    try {
        const res = await axios.post('/api/finalPayment', { cart,buyer },
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


