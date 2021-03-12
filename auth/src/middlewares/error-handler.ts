// import dependencies
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

// disable unused var for next line since the next function is required to be passed in
// to maintain the signature of the error handler middleware
// ---------------------
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction): Response => {
    // an error that follows the CustomError rules
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    // we got a type of error we didn't expect
    return res.status(400).send({
        errors: [{ message: 'An unexpected error occurred' }],
    });
};
