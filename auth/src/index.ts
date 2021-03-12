import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
    // make sure environment variables are defined
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    // connect to the mongodb
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Connected to MongoDb');
    } catch (err) {
        console.log(err);
    }

    // start the server
    app.listen(3000, () => {
        console.log('Listening on port 3000!');
    });
};

start().then();
