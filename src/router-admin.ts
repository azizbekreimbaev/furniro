import express, { Request, Response } from 'express'
import adminController from './controller/admin.controller';
import makeUploader from './libs/utils/uploader';
import productController from './controller/product.controller';

const routerAdmin = express.Router()

routerAdmin.get("/", adminController.goHome)

//============

routerAdmin
    .get("/signup", adminController.getSignup)
    .post("/signup", makeUploader("members").single("memberImage"), adminController.processSignup)

routerAdmin
    .get("/login", adminController.getLogin)
    .post("/login", adminController.processLogin)


routerAdmin.get("/logout", adminController.logout)
routerAdmin.get("/check-me", adminController.checkAuth)

/**PRODUCTS */


routerAdmin.get("/product/getall",
    adminController.verifyAdmin,
    productController.getAllProducts)


routerAdmin.post("/product/create",
    adminController.verifyAdmin,
    makeUploader("products").array("productImages", 5),
    productController.createProduct)


routerAdmin.post("/product/update/:id",
    adminController.verifyAdmin,
    productController.updateProduct)





/**USERS */


export default routerAdmin