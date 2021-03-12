import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { app } from '../app';
import request from 'supertest';

let mongo: MongoMemoryServer;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface Global {
            signUp(): Promise<string[]>;
        }
    }
}

// before everything starts
beforeAll(async () => {
    // set the environment variable for testing
    process.env.JWT_KEY = 'u6hAucrKjpAJjEgaKbKhdBpjfv8KKrKyV2R';

    // start up MongoMemoryServer
    mongo = new MongoMemoryServer();
    // get the url for the new server
    const mongoUri = await mongo.getUri();

    // connect to the new in-memory server
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// before each test runs
beforeEach(async () => {
    // get all the collections in the db
    const collections = await mongoose.connection.db.collections();

    // loop through all of the collections
    for (const collection of collections) {
        // delete the data in the collection
        await collection.deleteMany({});
    }
});

// after all of the tests are complete
afterAll(async () => {
    // stop the in-memory server
    await mongo.stop();
    // close the mongoose connection
    await mongoose.connection.close();
});

global.signUp = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password,
        })
        .expect(201);

    return response.get('Set-Cookie');
};
