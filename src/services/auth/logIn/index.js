
import axios from "axios";

export const login = async (loginFormData) => {

    try {
        const res = axios.post('/api/auth/login', loginFormData, {
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