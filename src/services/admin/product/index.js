import axios from "axios";

export const addProduct = async ({
  productName,
  description,
  price,
  discountedPrice,
  colors,
  onSale,
  quantity,
  category,
  photos,
}) => {
  try {
    const res = await axios.post(
      '/api/admin/product/addProduct',
      {
        productName,
        description,
        onSale,
        discountedPrice,
        price,
        colors,
        photos,
        category,
        quantity,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


export const getAllProducts = async (subCategoryId) => {
  try {
    const res = await axios.post('/api/admin/product/getAllProduct', subCategoryId, {

      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}



export const getSingleProduct = async (productId) => {
  try {
    const res = await axios.post('/api/admin/product/getSingleProduct', productId, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return res
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}