import mongoose, { Schema, Types } from "mongoose";
import { OrderItem } from "../libs/types/order";




const OrderItemSchema = new Schema<OrderItem>({
    itemQuantity: {
        type: Number,
        required: true
    },

    itemPrice: {
        type: Number,
        required: true
    },

    orderId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Order"
    },

    productId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Product"
    }

},

    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', }, collection: "orderItems" }

)

export default mongoose.model<OrderItem>("OrderItem", OrderItemSchema)

