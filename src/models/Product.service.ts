import { ObjectId } from "mongoose";
import { shapeIntMongooseObjectId } from "../libs/config";
import { ProductStatus } from "../libs/enums/product.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { Product, ProductInput, ProductInquiry, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enun";
import ViewService from "./View.service";
import ViewModel from "../schema/View.model";

class ProductService {
    private readonly productModel;
    public viewService;
    constructor() {
        this.productModel = ProductModel
        this.viewService = new ViewService()
    }


    /**SPA */

    public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
        try {

            const match: T = { productStatus: ProductStatus.ACTIVE }

            if (inquiry.productCategory) match.productCategory = inquiry.productCategory
            if (inquiry.productColor) match.productColor = inquiry.productColor
            if (inquiry.productMaterial) match.productMaterial = inquiry.productMaterial
            if (inquiry.search) match.productName = { $regex: new RegExp(inquiry.search, "i") }


            const sort: T = inquiry.order === "productPrice" ? { [inquiry.order]: 1 } : { [inquiry.order]: -1 }

            const result = await this.productModel.aggregate([
                { $match: match },
                { $sort: sort },
                { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
                { $limit: inquiry.limit * 1 }
            ]).exec();

            if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND)
            return result

        } catch (err) {
            throw new Errors(HttpCode.NOT_FOUND, Message.SOMETHING_WENT_WRONG)
        }
    }


    public async getProduct(userId: ObjectId | null, id: string): Promise<Product> {
        try {
            const productId = shapeIntMongooseObjectId(id)
            let result = await this.productModel.findOne({ _id: productId, productStatus: ProductStatus.ACTIVE })

            if (userId) {
                //Chech View

                const input: ViewInput = {
                    memberId: userId,
                    viewRef: productId,
                    viewGroup: ViewGroup.PRODUCT
                }

                const checkViewExistanse = await this.viewService.checkView(input)

                if (!checkViewExistanse) {
                    await this.viewService.insertUserView(input)
                    result = await this.productModel.findByIdAndUpdate(productId, { $inc: { "productViews": +1 } }, { returnDocument: 'after' }).exec()
                }


            }

            if (!result) throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG)

            return result

        } catch (err) {
            throw new Errors(HttpCode.NOT_FOUND, Message.SOMETHING_WENT_WRONG)
        }
    }







    /**SSR */

    public async getAllProducts(): Promise<Product[]> {

        const result = await this.productModel.find().exec()
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND)
        return result
    }

    public async createProduct(input: ProductInput): Promise<Product> {
        try {
            const result = await this.productModel.create(input)
            if (!result) throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED)
            return result
        } catch (err) {
            console.log("ERROR, createProduct", err)
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
    }

    public async updateProduct(id: string, input: ProductUpdateInput): Promise<Product> {
        try {
            const _id = shapeIntMongooseObjectId(id)

            const result = await this.productModel.findOneAndUpdate({ _id: _id }, input, { returnDocument: 'after' })

            if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED)

            return result

        } catch (err) {
            console.log("ERROR, updateProduct", err)
            throw new Errors(HttpCode.BAD_REQUEST, Message.UPDATE_FAILED)
        }
    }

}


export default ProductService