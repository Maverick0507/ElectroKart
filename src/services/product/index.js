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
    const res = await axios.post('/api/user/getAllProduct', subCategoryId, {

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
    const res = await axios.post('/api/user/getSingleProduct', productId, {
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


export const getLimitedProduct = async () => {
  try {
    const res = await axios.get('/api/user/getLimitedProduct')
    return res
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


export const getSearchedProduct = async (keyword) => {
  try {
    const res = await axios.post('/api/user/getProductBySearch', keyword, {
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

export const getFilterProduct = async (newMinValue,newMaxValue) => {
  console.log(newMinValue,newMaxValue);
  try {
    const res = await axios.post('/api/user/getProductByFilter', {newMinValue, newMaxValue}, {
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