import express from 'express'
import memberController from './controller/member.controller';

const router = express.Router();


/**USERS */

router.post("/user/signup", memberController.signup)

router.post("/user/login", memberController.login)

router.post("/user/logout", memberController.logout)

router.get("/user/detail", memberController.verifyAuth, memberController.getUserDetail)



/**PRODUCTS */


export default router