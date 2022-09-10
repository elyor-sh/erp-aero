import {Router} from 'express'
import {authController} from "./auth.controller";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {UserCreateDto} from "../user/user.dto";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router()

router.post('/signin', validationMiddleware(UserCreateDto), authController.login)
router.post('/signin/:new_token', authController.createAccessTokenByRefreshToken)
router.post('/signup', validationMiddleware(UserCreateDto), authController.register)
router.post('/logout', authMiddleware,  authController.logout)

export {router as authRouter}