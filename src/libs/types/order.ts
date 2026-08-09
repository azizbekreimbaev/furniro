import { ObjectId } from "mongoose";
import { OrderDelivery, OrderStatus } from "../enums/order.enum";

export interface OrderItemInput {
    itemQuantity: number
    itemPrice: number
    productId: ObjectId
    orderId?: ObjectId
}


export interface Order {
    _id: ObjectId
    orderTotal: number
    orderdelivery: OrderDelivery
    orderStatus: OrderStatus
    createdAt: Date
    updatedAt: Date

    // AGGREGATE  coming soon

}



export interface OrderItem {
    itemQuantity: number
    itemPrice: number
    productId: ObjectId
    orderId: ObjectId
    createdAt: Date
    updatedAt: Date
}

export interface OrderInquiry {
    page: number
    limit: number
    orderStatus: OrderStatus
}

export interface OrderUpdateInput {
    orderId: string,
    orderStatus: OrderStatus
}