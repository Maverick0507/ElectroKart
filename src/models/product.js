import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productCategory",
        required: true,
    },
    colors: [String],
    quantity: {
        type: Number,
        required: true,
    },
    photos: [
        {
            data: {
                type: Buffer,
                required: true,
            },
            contentType: {
                type: String,
                required: true,
            },
        },
    ],
    shipping: {
        type: Boolean,
    },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;