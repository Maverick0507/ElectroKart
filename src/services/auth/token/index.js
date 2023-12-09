
import axios from "axios";

export const token = async () => {

    try {
        const res = axios.get('/api/auth/token')
        return res;

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};