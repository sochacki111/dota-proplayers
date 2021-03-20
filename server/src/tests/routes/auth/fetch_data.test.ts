import request from 'supertest';
import app from '../../../app';

function loginUser(auth: any) {
  return function (done: any) {
    function onResponse(err: any, res: any) {
      auth.token = res.body.idToken;
      return done();
    }
    request(app)
      .post('/auth/local')
      .send({
        email: 'test@test.com',
        password: 'test'
      })
      .expect(200)
      .end(onResponse);
  };
}

const auth: any = {};
beforeAll(loginUser(auth));

it('returns 200 on successful fetch', async () => {
  await request(app)
    .post('/user/new')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  const res = await request(app)
    .post('/user/login')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);
  // console.log('hello from test');
  // console.log(res.text);
  const response = JSON.parse(res.text);
  console.log(response.idToken);

  return (
    request(app)
      .get('/user/fetch_data')
      // .set({
      //   Accept: 'application/json',
      //   headers: {
      //     Auhorization: `Bearer ${response}`
      //   }
      // })
      // .set('Authorization', `bearer ${response.idToken}`)
      .set('Authorization', `bearer ${auth.token}`)
      .expect(200)
  );
});

it('throws an error when invalid data', async () =>
  request(app)
    .post('/user/login')
    .send({ email: 'invalid@email.com' })
    .expect(400));

it('throws an error when no user in the database', async () =>
  request(app)
    .post('/user/login')
    .send({ email: 'ts@ts.com', password: 'pass' })
    .expect(400));
