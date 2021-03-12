// import dependencies
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
    // get any errors that were in the request
    const errors = validationResult(req);

    // if there are any errors
    if (!errors.isEmpty()) {
        // throw the errors
        throw new RequestValidationError(errors.array());
    }

    next();
};
