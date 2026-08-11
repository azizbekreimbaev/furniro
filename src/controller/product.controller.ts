import Errors, { Message } from "../libs/Errors";
import { T } from "../libs/types/common";



const productController: T = {}


productController.getAllProducts = async (req: Request, res: Response) => {
    try {
        console.log("getAllProducts");



    } catch (err) {
        console.log("ERROR, getAllProducts", err)
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        // res.send(`<script> alert("${message}"); window.location.replace('/admin/login')</script>`);
    }

}


productController.createProduct = async (req: Request, res: Response) => {
    try {
        console.log("createProduct");



    } catch (err) {
        console.log("ERROR, createProduct", err)
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        // res.send(`<script> alert("${message}"); window.location.replace('/admin/login')</script>`);
    }

}



productController.updateProduct = async (req: Request, res: Response) => {
    try {
        console.log("updateProduct");



    } catch (err) {
        console.log("ERROR, updateProduct", err)
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        // res.send(`<script> alert("${message}"); window.location.replace('/admin/login')</script>`);
    }

}





export default productController;