// import dependencies
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { throwExpression } from '../services/throw-null-error';

// create the express router
const router = express.Router();

router.post(
    '/api/users/signIn',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().notEmpty().withMessage('Password must not be empty'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        // get the passed in email & password from the request
        const { email, password } = req.body;
        // check if a user already exists with this email
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            // a user was not found with the given email address
            throw new BadRequestError('Login failed');
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);
        if (!passwordsMatch) {
            // invalid password was provided
            throw new BadRequestError('Login failed');
        }

        // generate jsonwebtoken
        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email,
            },
            process.env.JWT_KEY ?? throwExpression('JWT_KEY must be defined'),
        );

        // store jwt on the session object
        req.session = {
            jwt: userJwt,
        };

        res.status(200).send(existingUser);
    },
);

export { router as signInRouter };
