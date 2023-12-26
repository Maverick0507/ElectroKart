
import axios from "axios";

export const addCategory = async (name) => {
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

export const addSubCategory = async (name, parentCategory, photos) => {
    console.log(photos)
    try {
        const res = await axios.post('/api/admin/category/addSubCategory', { name, parentCategory, photos }, {
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


export const updatSubCategory = async (name, parentCategory, photos) => {
    try {
        const res = await axios.post('/api/admin/category/updateSubCategory', { name, parentCategory, photos }, {
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

export const fetchCategory = async ({ type, parentCategory, limit }) => {
    try {
        const res = limit === '0' ? type === 'category' ? await axios.get(`/api/admin/category/getAllCategory`)
            : await axios.post(`/api/admin/category/getAllSubCategory`, parentCategory, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            :
            type === 'category' ?
                await axios.post(`/api/admin/category/getLimitedcategory`, limit, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                : await axios.post(`/api/admin/category/getLimitedSubCategory`, {parentCategory,limit}, {
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


export const deleteCategory = async (id, type) => {
    console.log(type)
    try {
        const res = await type === 'category'
            ? axios.delete(`/api/admin/category/deleteCategory?id=${id}`)
            : axios.delete(`/api/admin/category/deleteSubCategory?id=${id}`)
        return res;

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const fetchSingleCategory = async (id) => {
    try {
        const res = await axios.post('/api/admin/category/getSingleCategory', id, {
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