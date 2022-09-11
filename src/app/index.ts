import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import swaggerUi from 'swagger-ui-express'
import {authRouter} from "../auth/auth.route";
import {errorMiddleware} from "../middlewares/error.middleware";
import {userRouter} from "../user/user.route";
import {fileRouter} from "../files/files.route";
import {STATIC_FOLDER_PATH} from "../config/vars";
import swaggerDocument from '../swagger/swagger.json'

const app = express()

// middlewares
app.use(cors())
app.use(fileUpload({}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.static(STATIC_FOLDER_PATH))

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//routes
app.use('/', authRouter)
app.use('/', userRouter)
app.use('/file', fileRouter)

// error handling
app.use(errorMiddleware)

export {app}