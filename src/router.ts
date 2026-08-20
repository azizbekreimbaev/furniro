import express from 'express'
import memberController from './controller/member.controller';
import makeUploader from './libs/utils/uploader';
import productController from './controller/product.controller';
import orderController from './controller/order.controller';

const router = express.Router();


/**USERS */

router.post("/user/signup", memberController.signup)

router.post("/user/login", memberController.login)

router.post("/user/logout", memberController.logout)

router.get("/user/detail", memberController.verifyAuth, memberController.getUserDetail)

router.post("/user/update",
    memberController.verifyAuth,
    makeUploader("members").single("memberImage"),
    memberController.updateUser)


/**PRODUCTS */
router.get("/product/all", productController.getProducts)

router.get("/product/:id", memberController.retrieveAuth, productController.getProduct)





/**ORDERS */

router.post("/order/create", memberController.verifyAuth, orderController.createOrder)

router.get("/order/getAll", memberController.verifyAuth, orderController.getMyOrders)

router.post("/order/update", memberController.verifyAuth, orderController.updateOrder)


export default router