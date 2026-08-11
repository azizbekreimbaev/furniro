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


export default routerAdmin