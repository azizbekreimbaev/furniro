import { NextFunction, Response } from "express";
import { T } from "../libs/types/common";
import { Extendedrequest, LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import MemberService from "../models/Member.service";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";



const memberController: T = {}
const memberService = new MemberService()

const authService = new AuthService()

memberController.signup = async (req: Extendedrequest, res: Response) => {
    try {
        console.log("signup")
        const input: MemberInput = req.body
        const result = await memberService.signup(input)

        const token = await authService.createToken(result)

        res.cookie("accessToken", token, { maxAge: AUTH_TIMER * 3600 * 1000, httpOnly: false })


        res.status(HttpCode.CREATED).json({ result: result })

    } catch (err) {
        console.log("ERROR, signup:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }

}

memberController.login = async (req: Extendedrequest, res: Response) => {
    try {
        console.log("login")
        const input: LoginInput = req.body
        const result = await memberService.login(input)
        const token = await authService.createToken(result)

        res.cookie("accessToken", token, { maxAge: AUTH_TIMER * 3600 * 1000, httpOnly: false })

        res.status(HttpCode.OK).json({ result: result })
    } catch (err) {
        console.log("ERROR, login:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);

    }
}

memberController.logout = async (req: Extendedrequest, res: Response) => {
    try {
        console.log("logout")
        const input: LoginInput = req.body


        res.cookie("accessToken", null, { maxAge: 0, httpOnly: true })

        res.status(HttpCode.OK).json({ logout: true })
    } catch (err) {
        console.log("ERROR, login:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);

    }
}

memberController.verifyAuth = async (req: Extendedrequest, res: Response, next: NextFunction) => {
    try {

        const token = req.cookies["accessToken"]

        if (token) req.member = await authService.chechAuth(token)

        if (!req.member) throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED)

        next()

    } catch (err) {
        console.log("ERROR, verifyAuth:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);

    }
}


memberController.retrieveAuth = async (req: Extendedrequest, res: Response, next: NextFunction) => {
    try {

        const token = req.cookies["accessToken"]

        if (token) req.member = await authService.chechAuth(token)
        next()

    } catch (err) {
        console.log("ERROR, retrieveAuth:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);

    }
}



memberController.getUserDetail = async (req: Extendedrequest, res: Response) => {
    try {

        const result = await memberService.getUserDetail(req.member)

        res.status(HttpCode.OK).json({ user: result })


    } catch (err) {
        console.log("ERROR, getUserDetail:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}


memberController.updateUser = async (req: Extendedrequest, res: Response) => {
    try {
        const input: MemberUpdateInput = req.body


        if (req.file) input.memberImage = req.file.path.replace(/\\/g, '/')
        console.log("BODY", input)

        const result = await memberService.updateUser(req.member, input)

        res.status(HttpCode.OK).json({ user: result })

    } catch (err) {
        console.log("ERROR, updateUser:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}



export default memberController;