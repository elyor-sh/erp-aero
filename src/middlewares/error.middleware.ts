import {NextFunction, Request, Response} from 'express'
import {HttpException} from "../utils/http-exception";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof HttpException){
        return res.status(err.status).json({message: err.message})
    }

    return res.status(500).json({message: 'Undefined error'})
}