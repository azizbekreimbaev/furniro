import { shapeIntMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Product, ProductInput, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";

class ProductService {
    private readonly productModel;

    constructor() {
        this.productModel = ProductModel
    }


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