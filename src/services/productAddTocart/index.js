import axios from "axios";



export const ProductAddToCart = async ({product_id,quantity,color,price}) => {
  try {
    const res = await axios.post('/api/user/productAddToCart', {product_id,quantity,color,price,productName}, {
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