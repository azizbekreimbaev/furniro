import mongoose, { Schema } from "mongoose";
import { OrderDelivery, OrderStatus } from "../libs/enums/order.enum";



const OrderSchema = new Schema({
    orderTotal: {
        type: Number,
        required: true
    },

    orderDelivery: {
        type: String,
        enum: OrderDelivery,
        default: OrderDelivery.COURIER
    },

    orderStatus: {
        type: String,
        enum: OrderStatus,
        default: OrderStatus.PENDING
    },

    memberId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Member"
    }

},
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', }, collection: "orders" }
)

export default mongoose.model("Order", OrderSchema)