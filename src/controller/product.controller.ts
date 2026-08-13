import { Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { AdminRequest } from "../libs/types/member";
import { ProductInput, ProductUpdateInput } from "../libs/types/product";
import ProductService from "../models/Product.service";



const productController: T = {}

const productService = new ProductService()


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