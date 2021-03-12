import request from 'supertest';
import { app } from '../../app';

it('returns a 200 on successful sign in', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);

    await request(app)
        .post('/api/users/signIn')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(200);
});

it('returns a 400 with an invalid email', async () => {
    await request(app)
        .post('/api/users/signIn')
        .send({
            email: 'test',
            password: 'password',
        })
        .expect(400);
});

it('returns a 400 with an incorrect password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);

    await request(app)
        .post('/api/users/signIn')
        .send({
            email: 'test@test.com',
            password: 'no',
        })
        .expect(400);
});

it('returns a 400 with either a missing email or password', async () => {
    await request(app)
        .post('/api/users/signIn')
        .send({
            password: 'password',
        })
        .expect(400);

    await request(app)
        .post('/api/users/signIn')
        .send({
            email: 'test',
        })
        .expect(400);
});

it('returns a 400 when an email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signIn')
        .send({
            email: 'non-existant@test.com',
            password: 'password',
        })
        .expect(400);
});

it('sets a cookie after successful sign in', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signIn')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});
