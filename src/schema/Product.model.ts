import mongoose, { Schema } from "mongoose";
import { ProductCategory, ProductColor, ProductMaterial, ProductStatus } from "../libs/enums/product.enum";



const ProductSchema = new Schema({
    productStatus: {
        type: String,
        enum: ProductStatus,
        default: ProductStatus.ACTIVE
    },

    productName: {
        type: String,
        required: true
    },

    productPrice: {
        type: Number,
        required: true
    },

    productLeftCount: {
        type: Number,
        required: true
    },

    productImages: {
        type: [String],
        default: []
    },

    productDesc: {
        type: String
    },

    productColor: {
        type: String,
        enum: ProductColor,
    },

    productViews: {
        type: Number,
        default: 0
    },

    ProductMaterial: {
        type: String,
        enum: ProductMaterial
    },

    productCategory: {
        type: String,
        enum: ProductCategory
    },

    productBrand: {
        type: String,
    },

},

    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', } }

)


export default mongoose.model("Product", ProductSchema)