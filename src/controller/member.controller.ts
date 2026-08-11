import { Response } from "express";
import { T } from "../libs/types/common";
import { Extendedrequest, LoginInput, Member, MemberInput } from "../libs/types/member";
import MemberService from "../models/Member.service";
import Errors, { HttpCode, Message } from "../libs/Errors";


const memberController: T = {}
const memberService = new MemberService()

memberController.signup = async (req: Extendedrequest, res: Response) => {
    try {
        console.log("signup")
        const input: MemberInput = req.body
        const result = await memberService.signup(input)

        res.status(HttpCode.CREATED).json({ result: result })

    } catch (err) {
        console.log("ERROR, signup", err)
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG
        res.send(`<script> alert("${message}"); window.location.replace('/admin/signup')</script>`);
    }

}

memberController.login = async (req: Extendedrequest, res: Response) => {
    try {
        console.log("login")
        const input: LoginInput = req.body

        const result = await memberService.login(input)
        res.status(HttpCode.OK).json({result: result})
    } catch (err) {
        console.log("ERROR, login", err)
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG
        res.send(`<script> alert("${message}"); window.location.replace('/admin/login')</script>`);

    }
}







export default memberController;