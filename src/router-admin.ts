import express, { Request, Response } from 'express'
import adminController from './controller/admin.controller';
import makeUploader from './libs/utils/uploader';

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


routerAdmin.get("/product/getall", adminController.getAllProducts)
routerAdmin.post("/product/create", adminController.createProduct)
routerAdmin.post("/product/update", adminController.updateProduct)





/**USERS */


export default routerAdmin