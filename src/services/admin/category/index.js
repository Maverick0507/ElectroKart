
import axios from "axios";

export const addCategory  = async (name) => {
    try {
        const res = await axios.post('/api/admin/category/addCategory', name, {
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


export const fetchCategory  = async () => {
    try {
        const res = await axios.get('/api/admin/category/getAllCategory')
        return res;

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};


export const deleteCategory  = async (id) => {
    try {
        const res = await axios.delete(`/api/admin/category/deleteCategory?id=${id}`)
        return res;

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};