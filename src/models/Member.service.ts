import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import bcrypt from 'bcrypt'


class MemberService {
    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel
    }

    /** SPA */



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


}


export default MemberService