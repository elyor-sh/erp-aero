import {Request, Response, NextFunction} from 'express'
import {UserCreateDto} from "../user/user.dto";
import {authService} from "./auth.service";
import {RequestWithUserInterface} from "../interfaces/request-with-user.interface";

class AuthController {


    async login (req: Request, res: Response, next: NextFunction) {
        try {

            const {id, password} = req.body as UserCreateDto

            const data = await authService.login({id, password})

            res.cookie('refreshToken', data.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.status(200).json(data)

        }catch (e) {

            console.log(e)

            next(e)
        }
    }

    async register (req: Request, res: Response, next: NextFunction) {
        try {

            const {id, password} = req.body as UserCreateDto

            const data = await authService.register({id, password})

            res.cookie('refreshToken', data.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})

            res.json(data)

        }catch (e) {
            next(e)
        }
    }

    async logout (req: RequestWithUserInterface, res: Response, next: NextFunction) {
        try {

            const userId = req.userId!

            await authService.logout(userId)

            res.json({message: 'Success'})

        }catch (e) {
            next(e)
        }
    }

    async createAccessTokenByRefreshToken (req: Request, res: Response, next: NextFunction) {
        try {

            const {new_token}  = req.params

            if(!new_token){
                return res.status(401).json({message: 'User not authorized'})
            }

            const data = await authService.createAccessTokenByRefreshToken(new_token)

            res.json(data)

        }catch (e) {
            next(e)
        }
    }
}

export const authController = new AuthController()