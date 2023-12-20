import mongoose from 'mongoose'

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        photos: {
            type: String,
            default: 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'
        },

    }
)
const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', subCategorySchema);

export default SubCategory;