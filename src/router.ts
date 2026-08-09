import express from 'express'
import { Request, Response } from 'express'

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("HOME PAGE")
})

router.get("/login", (req: Request, res: Response) => {
    res.send("LJKAHDKHGHLOGIN PAGE")
})

export default router