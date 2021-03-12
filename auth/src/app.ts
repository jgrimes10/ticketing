// import dependencies
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

// import all of the routes
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

// import middleware
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

// set up the app
const app = express();
// make sure express knows it's behind nginx proxy
app.set('trust proxy', true);

// inject the middleware
app.use(json());
app.use(
    cookieSession({
        // disable encryption on the cookie
        signed: false,
        // cookie only usable if on a https connection
        secure: process.env.NODE_ENV !== 'test',
    }),
);

// inject the routes
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// catch all for routes that don't exist
app.all('*', async () => {
    throw new NotFoundError();
});

// inject custom middleware
app.use(errorHandler);

// export the app to be started up on the server or to start for automated tests
export { app };
