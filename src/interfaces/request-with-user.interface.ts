import {Request} from 'express'

export interface RequestWithUserInterface extends Request{
    userId?: string
}