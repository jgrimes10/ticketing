// import dependencies
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { throwExpression } from '../services/throw-null-error';

// create the express router
const router = express.Router();

router.post(
    '/api/users/signUp',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        // get the passed in email & password from the request
        const { email, password } = req.body;
        // check if a user already exists with this email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // a user was found with the given email address
            throw new BadRequestError('Email already in use');
        }

        // create the user
        const user = User.build({ email, password });
        // save the user to the db
        await user.save();

        // generate jsonwebtoken
        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_KEY ?? throwExpression('JWT_KEY must be defined'),
        );

        // store jwt on the session object
        req.session = {
            jwt: userJwt,
        };

        res.status(201).send(user);
    },
);

export { router as signUpRouter };
