import { Response, Request } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { AdminRequest, Extendedrequest } from "../libs/types/member";
import { ProductInput, ProductInquiry, ProductUpdateInput } from "../libs/types/product";
import ProductService from "../models/Product.service";
import { ProductCategory, ProductColor, ProductMaterial } from "../libs/enums/product.enum";



const productController: T = {}

const productService = new ProductService()

/**SPA */
productController.getProducts = async (req: Request, res: Response) => {
    try {

        const { page, limit, order, productColor, productMaterial, productCategory, search } = req.query;

        const inquiry: ProductInquiry = {
            order: String(order),
            page: Number(page),
            limit: Number(limit),
        }

        if (productColor) inquiry.productColor = productColor as ProductColor
        if (productMaterial) inquiry.productMaterial = productMaterial as ProductMaterial
        if (productCategory) inquiry.productCategory = productCategory as ProductCategory
        if (search) inquiry.search = String(search);

        const result = await productService.getProducts(inquiry)

        res.status(HttpCode.OK).json({ result: result })

    } catch (err) {
        console.log("Error on getAllProducts", err)

        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standart.code).json(Errors.standart)
    }
}


productController.getProduct = async (req: Extendedrequest, res: Response) => {
    try {
        console.log("GET PRODUCT")

        const { id } = req.params

        const userId = req.member?._id ?? null

        const result = await productService.getProduct(userId, id as string)

        res.status(HttpCode.OK).json({ result: result })

    } catch (err) {
        console.log("Error on getProduct", err)
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standart.code).json(Errors.standart)
    }
}





/**SSR */
productController.getAllProducts = async (req: Request, res: Response) => {
    try {
        console.log("getAllProducts");

        const data = await productService.getAllProducts()
        console.log("data", data)
        res.render("products", { products: data })
    } catch (err) {
        console.log("ERROR, getAllProducts", err)
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(`<script> alert("${message}"); window.location.replace('/admin/product/all')</script>`);
    }

}


productController.createProduct = async (req: AdminRequest, res: Response) => {
    try {
        console.log("createProduct");

        const files = req.files

        if (!files.length) throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED)

        const data: ProductInput = req.body

        data.productImages = files.map((ele) => {
            return ele.path.replace(/\\/g, '/');
        })

        await productService.createProduct(data)

        res.send(`<script> alert("Successfully created"); window.location.replace('/admin/product/getall')</script>`);

    } catch (err) {
        console.log("ERROR, createProduct", err)
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(`<script> alert("${message}"); window.location.replace('/admin/product/all')</script>`);
    }

}



productController.updateProduct = async (req: AdminRequest, res: Response) => {
    try {
        console.log("updateProduct");
        console.log("update data", req.body)

        const id = req.params.id as string
        console.log("params id", id)


        const data: ProductUpdateInput = req.body


        await productService.updateProduct(id, data)


        res.send(`<script> alert("Successfully updated"); window.location.replace('/admin/product/all')</script>`);
    } catch (err) {
        console.log("ERROR, updateProduct", err)
        const message = err instanceof Errors ? err.message : Message.UPDATE_FAILED;
        res.send(`<script> alert("${message}"); window.location.replace('/admin/product/all')</script>`);
    }

}








export default productController;