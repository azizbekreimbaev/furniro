import { ObjectId } from "mongoose";
import { ViewGroup } from "../enums/view.enun";

export interface View {
    _id: ObjectId
    viewGroup: ViewGroup
    memberId: ObjectId
    viewRef: ObjectId
    createdAt: Date
    updatedAt: Date
}

export interface ViewInput {
    viewGroup: ViewGroup
    memberId: ObjectId
    viewRef: ObjectId
}