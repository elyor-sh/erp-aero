import { Response, NextFunction} from 'express'
import {jwtService} from "../auth/jwt.service";
import {RequestWithUserInterface} from "../interfaces/request-with-user.interface";

export function authMiddleware (req: RequestWithUserInterface, res: Response, next: NextFunction){
    if(req.method === 'OPTIONS'){
        next()
    }

    try {

        const headers = req.headers

        const authorization = headers.authorization

        if(!authorization){
            return res.status(401).json({message: 'User not authorized'})
        }

        const token = authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: 'User not authorized'})
        }

        const decodedData = jwtService.decodeAccessToken(token)
        req.userId = decodedData.id
        next()

    } catch (error) {
        return res.status(401).json({message: 'User not authorized'})
    }
}