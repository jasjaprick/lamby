const request = require('supertest');

const mocksMatch = require('./mocksMatch');
const mocksPositions = require('./mocksPositions');
const mocksUser = require('./mocksUser');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



describe('Session Server:', function () {
  const server = require('../index');
  const agent = request.agent(server)

  afterEach(async () => {
    try {
      await mongoose.connection.dropCollection('users');
    } catch (error) {
      return true;
    }
  });

  describe('User API', () => {
    it('should answer with an emty data', async () => {
        const res = await request(app).get('/match')
        expect(res.statusCode).toEqual(500)
    }),
})