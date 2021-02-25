import request from 'supertest';
import app from '../../../app';

it('returns 200 on successful signin', async () => {
  await request(app)
    .post('/user/new')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  return request(app)
    .post('/user/login')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);
});

it('throws an error when invalid data', async () => request(app)
    .post('/user/login')
    .send({ email: 'invalid@email.com' })
    .expect(400));

it('throws an error when no user in the database', async () => request(app)
    .post('/user/login')
    .send({ email: 'ts@ts.com', password: 'pass' })
    .expect(400));
