const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route Testing', () => {
  //test user creation
  describe('/user/signup', () => {
    describe('POST', () => {
      it('responds with 200 status and application/json type when username and password are provided', () =>
        request(server)
          .post('/user/signup')
          .send({ username: 'test13', password: 'test13' })
          .expect(200)
          .expect('Content-Type', /json/));

      it('responds with 500 status and application/json type when password is not provided', () => {
        request(server)
          .post('/user/signup')
          .send({ username: 'test12', password: '' })
          .expect(500);
        //   .then((response) => expect(response.body).toBeInstanceOf(Error));
      });
    });
  });

  //   .expect( () => {
  //     .toBeInstanceOf(Error));

  //test user update
  describe('/user', () => {
    describe('PATCH', () => {
      it('responds with 200 status code and application/json', () => {
        request(server)
          .patch('/user')
          .send({
            username: 'tes4',
            notes: 'testing the updating parks visited',
            dateVisited: '11/11/2011',
            activitiesDone: ['tested stuff'],
            parkCode: 'zion',
            parksVisited: {},
          })
          .expect(200)
          .expect('Content-Type', /json/);
      });
    });
  });
});
