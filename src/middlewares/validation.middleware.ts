import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';

export function validationMiddleware<T>(type: any): express.RequestHandler {
    return (req, res, next) => {
        validate(plainToClass(type, req.body))
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors.map((error: ValidationError) => Object.values(error.constraints as any)).join(', ');
                    return res.status(400).json({message})
                } else {
                    next();
                }
            });
    };
}