import express, { Request, Response } from 'express'

const routerAdmin = express.Router()

routerAdmin.get("/", (req: Request, res: Response) => {
    res.send("ADMIN PAGE WELCOME ")
})




export default routerAdmin