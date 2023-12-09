
import axios from "axios";

export const signin = async (signinFormData) => {

    try {
        const res = axios.post('/api/auth/signin', signinFormData, {
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