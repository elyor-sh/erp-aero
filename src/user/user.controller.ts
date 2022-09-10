import {NextFunction, Response} from "express";
import {userService} from "./user.service";
import {RequestWithUserInterface} from "../interfaces/request-with-user.interface";

class UserController {

    async info (req: RequestWithUserInterface, res: Response, next: NextFunction) {
        try {

            const userId = req.userId!

            const user = await userService.getOne(userId, 'id')

            res.json(user)

        }catch (e) {
            next(e)
        }
    }
}

export const userController = new UserController()