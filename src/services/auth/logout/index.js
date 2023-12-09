
import axios from "axios";

export const logout = async (loginFormData) => {

    try {
        const res = axios.get('/api/auth/logout')
        return res;

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};