import {Router} from 'express'
import {authMiddleware} from "../middlewares/auth.middleware";
import {userController} from "./user.controller";

const router = Router()

router.get('/info', authMiddleware, userController.info)

export { router as userRouter }