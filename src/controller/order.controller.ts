import { Response } from "express";
import { T } from "../libs/types/common";
import { Extendedrequest } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import OrderService from "../models/Order.service";
import { OrderInquiry, OrderUpdateInput } from "../libs/types/order";
import { OrderStatus } from "../libs/enums/order.enum";


const orderController: T = {}


const orderService = new OrderService()

orderController.createOrder = async (req: Extendedrequest, res: Response) => {
    try {
        console.log("createOrder")

        const result = await orderService.createOrder(req.member, req.body)

        res.status(HttpCode.OK).json({ result: result })

    } catch (err) {
        console.log("ERROR on, createOrder", err)
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standart.code).json(Errors.standart)
    }
}





orderController.getMyOrders = async (req: Extendedrequest, res: Response) => {
    try {
        console.log("getMyOrders")

        const { page, limit, orderStatus } = req.query

        const inquiry: OrderInquiry = {
            page: Number(page),
            limit: Number(limit),
            orderStatus: orderStatus as OrderStatus
        }

        const result = await orderService.getMyOrders(req.member, inquiry)

        res.status(HttpCode.OK).json(result)

    } catch (err) {
        console.log("ERROR on, getMyOrders", err)
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standart.code).json(Errors.standart)
    }
}



orderController.updateOrder = async (req: Extendedrequest, res: Response) => {
    try {
        console.log("updateOrder")

        const input: OrderUpdateInput = req.body

        const result = await orderService.updateOrder(req.member, input)

        res.status(HttpCode.OK).json(result)

    } catch (err) {
        console.log("ERROR on, getMyOrders", err)
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standart.code).json(Errors.standart)
    }
}










export default orderController;