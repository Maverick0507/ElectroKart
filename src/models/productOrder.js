
import mongoose from 'mongoose'

const ProductOrderSchema = new mongoose.Schema(
    {
        products: [{
            type: mongoose.ObjectId,
            ref: 'Product'
        }],
        buyer:
        {
            type: mongoose.ObjectId,
            ref: 'User',
        },
        status: {
            type: String,
            default: "Not Process",
            enum: ["Not Process", "Processing", "shipped", "deliverd", "cancel"]
        },
        payment: {},

    }, { timestamps: true }
);

const ProductOrder = mongoose.models.ProductOrder || mongoose.model('ProductOrder', ProductOrderSchema);

export default ProductOrder;