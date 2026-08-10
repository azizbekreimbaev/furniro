import mongoose, { Schema } from "mongoose";
import { ViewGroup } from "../libs/enums/view.enun";




const ViewSchema = new Schema({
    viewGroup: {
        type: String,
        enum: ViewGroup,
        default: ViewGroup.PRODUCT
    },

    memberId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Member"
    },

    viewRef: {
        type: Schema.Types.ObjectId,
        required: true,
    }

},

    { timestamps: true }

)

export default mongoose.model("View", ViewSchema)