import axios from "axios"

export const getAllUser = async () => {

    try {
        const res = await axios.get('/api/admin/allUser')
        return res
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export const getAllUserOrder = async () => {

    try {
        const res = await axios.get('/api/admin/allOrder')
        return res
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}