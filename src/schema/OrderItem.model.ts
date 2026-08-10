import mongoose, { Schema } from "mongoose";




const OrderItemSchema = new Schema({
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
    }

},

    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', }, collection: "orderItems" }

)

export default mongoose.model("OrderItem", OrderItemSchema)