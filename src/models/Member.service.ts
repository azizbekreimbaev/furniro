import { escape } from "node:querystring";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import bcrypt from 'bcrypt'
import { shapeIntMongooseObjectId } from "../libs/config";


class MemberService {
    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel
    }

    /** SPA */

    public async signup(input: MemberInput): Promise<Member> {
        const salt = await bcrypt.genSalt()
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt)

        try {
            const result = await this.memberModel.create(input)
            result.memberPassword = ''
            return result.toJSON()
        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE)
        }
    }


    public async login(input: LoginInput): Promise<Member> {
        try {
            const member = await this.memberModel.findOne(
                {
                    memberNick: input.memberNick,
                    memberStatus: { $ne: MemberStatus.BLOCK }
                },
                { memberNick: 1, memberPassword: 1, memberStatus: 1 }
            ).exec()

            if (!member) {
                throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK)
            } else if (member.memberStatus === MemberStatus.BLOCK) {
                throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER)
            }
            const isMatch = await bcrypt.compare(input.memberPassword, member.memberPassword)

            if (!isMatch) throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD)

            const result = await this.memberModel.findById(member._id).lean().exec()
            if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.SOMETHING_WENT_WRONG)

            return result

        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG)

        }
    }



    public async getUserDetail(user: Member): Promise<Member> {

        const userId = shapeIntMongooseObjectId(user._id)

        const result = await this.memberModel.findOne({ _id: userId, memberStatus: MemberStatus.ACTIVE }).exec()

        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND)
        return result

    }















    /** SSR */

    public async processSignup(input: MemberInput): Promise<Member> {
        const exist = await this.memberModel.findOne({ memberType: MemberType.ADMIN }).exec()

        console.log("bor", exist)

        if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)

        const salt = await bcrypt.genSalt();
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt)


        try {
            const result = await this.memberModel.create(input)
            result.memberPassword = ""
            return result
        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
    }


    public async processLogin(input: LoginInput): Promise<Member> {
        try {
            const member = await this.memberModel
                .findOne(
                    { memberNick: input.memberNick },
                    { memberNick: 1, memberPassword: 1, memberStatus: 1 }
                )
                .exec()

            if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK)

            const isMatch = await bcrypt.compare(input.memberPassword, member.memberPassword)

            if (!isMatch) throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED)


            const result = await this.memberModel.findById(member._id).exec()

            if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NOT_AUTHENTICATED)

            return result

        } catch (err) {
            console.log("Error processLogin", err)
            throw err
        }
    }


    public async getAllUsers(): Promise<Member[]> {
        try {
            const result = await this.memberModel.find({ memberType: MemberType.USER }).exec()
            if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND)
            return result
        } catch (err) {
            console.log("Error on getAllUsers service model", err)
            throw new Errors(HttpCode.BAD_REQUEST, Message.NO_DATA_FOUND)
        }
    }

    public async editUser(input: MemberUpdateInput): Promise<Member> {
        try {
            const _id = shapeIntMongooseObjectId(input._id)

            const result = await this.memberModel.findByIdAndUpdate(
                { _id: _id },
                input,
                { returnDocument: 'after' }
            )

            if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED)

            return result

        } catch (err) {
            console.log("Error on editUser service model", err)
            throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED)
        }
    }

}


export default MemberService