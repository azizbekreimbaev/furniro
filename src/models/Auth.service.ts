import { AUTH_TIMER } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member } from "../libs/types/member";
import jwt from 'jsonwebtoken'

class AuthService {

    private readonly secretToken: string

    constructor() {
        this.secretToken = process.env.SECRET_TOKEN as string
    }



    public async createToken(payload: Member) {
        return new Promise((resolve, reject) => {
            const expiresIn = `${AUTH_TIMER}h`;

            jwt.sign(payload, process.env.SECRET_TOKEN as string, { expiresIn: expiresIn },
                (err, token) => {
                    if (err) reject(new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED))
                    resolve(token as string)
                }
            )

        })
    }


    public async chechAuth(token: string): Promise<Member> {
        const result: Member = (await jwt.verify(token, process.env.SECRET_TOKEN as string)) as Member
        console.log('====================================');
        console.log(`--- [AUTH] memberNick: ${result.memberNick}`);
        console.log('====================================');
        return result
    }


}

export default AuthService