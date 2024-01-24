
import axios from "axios";

export const userUpdate = async (userData) => {
    try {
        const res = axios.post('/api/user/updateUser', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res;

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const getAllOrders = async (uid) => {
    try {
   console.log(uid)
        const res = axios.post('/api/user/getAllOrderedProduct', uid, {
            headers: {
                'Content-Type': "application/json"
            }
        })
        return res

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}