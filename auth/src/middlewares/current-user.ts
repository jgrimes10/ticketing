import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { throwExpression } from '../services/throw-null-error';

// an interface for what the user payload will look like on a request
interface UserPayload {
    id: string;
    email: string;
}

// add the currentUser to the type definition of Request
declare module 'express' {
    interface Request {
        currentUser?: UserPayload;
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction): void => {
    // if req.session or req.session.jwt are not defined, skip to next middleware
    if (!req.session?.jwt) {
        return next();
    }

    try {
        // check if the JWT is valid
        req.currentUser = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY ?? throwExpression('JWT_KEY must be defined'),
        ) as UserPayload;
    } catch (err) {
        res.send('error');
    }

    // always continue to the next middleware
    next();
};
