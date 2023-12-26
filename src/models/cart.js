
import mongoose from 'mongoose'

const productCartSchema = new mongoose.Schema(
    {
        product_id: {
            type: String,
            required: true,
            unique: true,
        },
        productName: {
            type: String,
            required: true,
            unique: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },

    }
);

const ProductCart = mongoose.models.ProductCart || mongoose.model('ProductCart', productCartSchema);

export default ProductCart;