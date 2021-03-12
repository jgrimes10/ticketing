import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
    const cookie = await global.signUp();

    const response = await request(app).get('/api/users/currentUser').set('Cookie', cookie).send().expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});
