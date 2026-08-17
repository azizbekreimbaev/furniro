import { ObjectId } from "mongoose";
import { ProductCategory, ProductColor, ProductMaterial, ProductStatus } from "../enums/product.enum";

export interface Product {
    _id: ObjectId,
    productStatus: ProductStatus
    productName: string
    productPrice: number
    productLeftCount: number
    productImages: string[]
    productDesc: string
    productColor: ProductColor
    productViews?: number
    productMaterial: ProductMaterial
    productCategory: ProductCategory
    productBrand: string
    createdAt: Date
    updatedAt: Date
}

export interface ProductUpdateInput {
    _id: ObjectId,
    productStatus?: ProductStatus
    productName?: string
    productPrice?: number
    productLeftCount?: number
    productImages?: string[]
    productDesc?: string
    productColor?: ProductColor
    productViews?: number
    productMaterial?: ProductMaterial
    productCategory?: ProductCategory
    productBrand?: string
}

export interface ProductInput {
    productStatus?: ProductStatus
    productName: string
    productPrice: number
    productLeftCount: number
    productImages?: string[]
    productDesc?: string
    productColor?: ProductColor
    productViews?: number
    productMaterial?: ProductMaterial
    productCategory?: ProductCategory
    productBrand?: string
}


export interface ProductInquiry {
    order: string,
    page: number,
    limit: number,
    productCategory?: ProductCategory,
    productMaterial?: ProductMaterial,
    productColor?: ProductColor,
    search?: string
}