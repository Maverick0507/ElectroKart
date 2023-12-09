import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,   },
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
        type: mongoose.Schema.Types.ObjectId,    ref: "productCategory",
        required: true,
    },
    colors: [String],
    quantity: {
        type: Number,
        required: true,
    },
    photos: {
        data: Buffer,
        contentType: String,
    },
    shipping: {
        type: Boolean,
    },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
