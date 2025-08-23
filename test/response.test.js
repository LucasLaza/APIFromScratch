const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const expectedResponse = require('./fixture/response/registerLucas.json');

describe('Fixture Response Test', () => {
  it('should match the expected response for user registration', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: "Lucas",
        password: "123456",
        favorecidos: ["Cris"]
      });

    Object.keys(expectedResponse).forEach(key => {
      if (Array.isArray(expectedResponse[key])) {
        expect(res.body[key]).to.deep.equal(expectedResponse[key]);
      } else {
        expect(res.body).to.have.property(key, expectedResponse[key]);
      }
    });
  });
});
