import { ObjectId } from "mongoose";
import { MemberStatus, MemberType } from "../enums/member.enum";
import { Request } from "express";
import { Session } from 'express-session'

export interface Member {
    _id: ObjectId
    memberType: MemberType,
    memberStatus: MemberStatus,
    memberNick: string,
    memberPhone: string,
    memberPassword: string,
    memberImage?: string,
    memberPoints: number,
    memberAddress?: string,
    memberDesc?: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface MemberInput {
    memberType?: MemberType,
    memberStatus?: MemberStatus,
    memberNick: string,
    memberPhone: string,
    memberPassword: string,
    memberImage?: string,
    memberPoints?: number,
    memberAddress?: string,
    memberDesc?: string,
}

export interface MemberUpdateInput {
    _id: ObjectId,
    memberType?: MemberType,
    memberStatus?: MemberStatus,
    memberNick?: string,
    memberPhone?: string,
    memberPassword?: string,
    memberImage?: string,
    memberPoints?: number,
    memberAddress?: string,
    memberDesc?: string,
}

export interface LoginInput {
    memberNick: string,
    memberPassword: string,
}



export interface Extendedrequest extends Request {
    member: Member,
    file: Express.Multer.File,
    files: Express.Multer.File[]
}

export interface AdminRequest extends Request {
    member: Member,
    session: Session & { member: Member }
    file: Express.Multer.File
    files: Express.Multer.File[]
}