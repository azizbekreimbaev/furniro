import express, { Request, Response } from 'express'
import { T } from '../libs/types/common';
import { AdminRequest, LoginInput, MemberInput } from '../libs/types/member';
import MemberService from '../models/Member.service';
import Errors, { HttpCode, Message } from '../libs/Errors';
import { MemberType } from '../libs/enums/member.enum';

const adminController: T = {};

const memberSrvice = new MemberService();

adminController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome")
        res.send("HOME PAGE")
    } catch (err) {
        console.log("ERROR, goHome", err)
        res.redirect("/admin")
    }
}


adminController.getSignup = (req: AdminRequest, res: Response) => {
    try {
        console.log("getSignup")

        res.send("SIGNUP OK SIGNUP PAGE RENDER COMING SOON")
        // res.render("signup")
    } catch (err) {
        console.log("ERROR, getSignup", err)
        res.redirect("/admin")
    }
}

adminController.processSignup = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processSignup")

        console.log("body", req.body)

        const fileImage = req.file
        if (!fileImage) throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG)

        console.log("1")
        const newMember: MemberInput = req.body;
        newMember.memberImage = req.file?.path.replace(/\\/g, '/');
        newMember.memberType = MemberType.ADMIN

        const result = await memberSrvice.processSignup(newMember)


        // SESSION
        res.send("Created Successfully")


    } catch (err) {
        console.log("ERROR, processSignup", err)
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(`<script> alert("${message}"); window.location.replace('/admin/signup')</script>`);
    }

}


adminController.getLogin = (req: AdminRequest, res: Response) => {
    try {
        console.log("getSignup")

        res.send("Login PAGE RENDER COMING SOON")
        // res.render("login")
    } catch (err) {
        console.log("ERROR, getSignup", err)
        res.redirect("/admin")
    }
}


adminController.processLogin = async (req: AdminRequest, res: Response) => {

    try {
        console.log("processLogin");

        const input: LoginInput = req.body;

        const result = await memberSrvice.processLogin(input)

        res.send("Existing member")

    } catch (err) {
        console.log("ERROR, processLogin", err)
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(`<script> alert("${message}"); window.location.replace('/admin/signup')</script>`);
    }

}


export default adminController;