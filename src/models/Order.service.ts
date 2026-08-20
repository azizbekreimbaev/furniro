import { ObjectId } from "mongoose";
import { shapeIntMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member } from "../libs/types/member";
import { Order, OrderInquiry, OrderItemInput, OrderUpdateInput } from "../libs/types/order";
import OrderModel from "../schema/Order.model";
import OrderItemModel from "../schema/OrderItem.model";
import { OrderStatus } from "../libs/enums/order.enum";
import MemberService from "./Member.service";


class OrderService {
    private readonly orderModel;
    private readonly orderItemModel;
    private readonly memberService;
    constructor() {
        this.orderModel = OrderModel
        this.orderItemModel = OrderItemModel
        this.memberService = new MemberService()
    }

    public async createOrder(user: Member, input: OrderItemInput[]): Promise<Order> {

        const userId = shapeIntMongooseObjectId(user._id)

        const amount = input.reduce((accumulator: number, item: OrderItemInput) => {
            return accumulator + item.itemPrice * item.itemQuantity
        }, 0)

        const delivery = amount > 1000 ? 0 : 100

        try {

            const newOrder: Order = await this.orderModel.create({
                orderTotal: delivery + amount,
                orderDeliveryAmount: delivery,
                memberId: userId
            })


            const orderId = newOrder._id

            await this.recordItem(orderId, input)

            return newOrder
        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
    }


    private async recordItem(
        orderId: ObjectId,
        input: OrderItemInput[]
    ): Promise<void> {

        const promisedList = input.map(async (item: OrderItemInput) => {

            item.orderId = orderId;
            item.productId = shapeIntMongooseObjectId(item.productId)

            await this.orderItemModel.create(item);

            return "INSERTED";
        });

        const orderItemState = await Promise.all(promisedList);

        console.log("orderItemState", orderItemState);
    }



    public async getMyOrders(user: Member, inquiry: OrderInquiry): Promise<Order[]> {

        const userId = shapeIntMongooseObjectId(user._id)

        const matches = { memberId: userId, orderStatus: inquiry.orderStatus }



        try {


            const result = await this.orderModel.aggregate([
                { $match: matches },
                { $sort: { "updatedAt": -1 } },
                { $skip: (inquiry.page - 1) * inquiry.limit },
                { $limit: inquiry.limit },


                {
                    $lookup: {
                        from: "orderItems",
                        localField: "_id",
                        foreignField: "orderId",
                        as: "orderItems"

                    }
                },

                {
                    $lookup: {
                        from: "products",
                        localField: "orderItems.productId",
                        foreignField: "_id",
                        as: "productData"

                    }
                },


            ]).exec()

            if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND)


            return result
        } catch (err) {
            throw new Errors(HttpCode.NOT_FOUND, Message.SOMETHING_WENT_WRONG)
        }
    }


    public async updateOrder(user: Member, input: OrderUpdateInput): Promise<Order> {

        const memberId = shapeIntMongooseObjectId(user._id)
        const orderId = shapeIntMongooseObjectId(input.orderId)
        const orderStatus = input.orderStatus
        try {

            const result = await this.orderModel.findOneAndUpdate(
                { memberId: memberId, _id: orderId },
                { orderStatus: orderStatus },
                { returnDocument: 'after' }).exec()




            if (!result) throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.UPDATE_FAILED)

            if (orderStatus === OrderStatus.SHIPPED) {
                await this.memberService.addPoint(user, 1)
            }


            return result


        } catch (err) {
            throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED)
        }

    }


}

export default OrderService;