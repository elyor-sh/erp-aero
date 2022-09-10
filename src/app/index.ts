import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {authRouter} from "../auth/auth.route";
import {errorMiddleware} from "../middlewares/error.middleware";
import {userRouter} from "../user/user.route";

const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

//routes
app.use('/', authRouter)
app.use('/', userRouter)

// error handling
app.use(errorMiddleware)

export {app}