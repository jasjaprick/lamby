const request = require('supertest');
const { expect } = require('chai');

const API = 'http://localhost:3001';
let app = require('../index');
const db = require('../model');

const mocksMatch = require('./mocksMatch');
const mocksPositions = require('./mocksPositions');
const mocksUser = require('./mocksUser');

describe('set up the enviroment', async () => {
  before(async () => {
    app = require('../index');
  });
  after(() => {
    db.sequelize.close();
    app.close();
  });
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
  });
  describe('All tables are emty before testing', async () => {
    it('check if MATCH`s table is emty (get)', async () => {
      const res = await request(API).get('/match');
      expect(res.statusCode).equal(200);
      expect(res.text).equal('[]');
    });
    it('check if User`s table is emty (get)', async () => {
      const res = await request(API).get('/user');
      expect(res.statusCode).equal(200);
      expect(res.text).equal('[]');
    });
  });

  describe('check MATCH`S table', async () => {
    beforeEach(async () => {
      await db.Match.create(mocksMatch.mockMatch5);
      await db.Match.create(mocksMatch.mockMatch6);
      await db.Match.create(mocksMatch.mockMatch1);
    });

    it('Getting Next Match (get)', async () => {
      const res = await request(API).get('/match');
      expect(res.statusCode).equal(200);
      expect(res.body[1].venue).equal('paris');
      expect(res.body[1].id).equal(2);
    });

    it('Getting all MATCHS (get)', async () => {
      let res = await request(API).get('/match');
      expect(res.statusCode).equal(200);
      expect(res.body[2].venue).equal('Old Trafford');
      expect(res.body[2].id).equal(3);
      res = await request(API).get('/matchs');
      expect(res.statusCode).equal(404);
    });

    it('Create a new Matches (post)', async () => {
      let res = await request(API)
        .post('/match')
        .set('Content-Type', 'application/json')
        .send(mocksMatch.mockMatch2);
      expect(res.status).equal(201);
      let test = await db.Match.findAll();
      expect(test[3].dataValues.venue).equal('Madrid');
      expect(test.length).eql(4);
    });

    it('Create a new Matches (post-error-handler)', async () => {
      let res = await request(API)
        .post('/match')
        .set('Content-Type', 'application/json')
        .send(mocksMatch.mockMatch7);
      expect(res.statusCode).equal(500);
    });
  });

  describe('check user`s table', async () => {
    let res;
    beforeEach(async () => {
      await db.User.create(mocksUser.mockUser1);
      await db.User.create(mocksUser.mockUser2);
      await db.User.create(mocksUser.mockUser3);
      await db.User.create(mocksUser.mockUser4);
    });

    it('Getting User by Id (get)', async () => {
      res = await request(API).get('/user/1');
      expect(res.statusCode).equal(200);
      expect(res.body.email).equal('yani@gmail.com');
      expect(res.body.id).equal(1);
    });

    it('Getting All Users  (get)', async () => {
      res = await request(API).get('/user');
      expect(res.statusCode).equal(200);
      expect(res.body[3].playerNumber).equal(4);
      expect(res.body.length).equal(4);
      res = await request(API).get('/users');
      expect(res.statusCode).equal(404);
    });
    it('Create a new User (post-error-handler)', async () => {
      res = await request(API)
        .post('/user')
        .set('Content-Type', 'application/json')
        .send(mocksUser.mockUser6);
      expect(res.status).equal(500);
      let test = await db.User.findAll();
      expect(test.length).equal(4);
    });

    it('Create a new User (post)', async () => {
      res = await request(API)
        .post('/user')
        .set('Content-Type', 'application/json')
        .send(mocksUser.mockUser5);
      expect(res.status).equal(201);
      res = await db.User.findAll();
      expect(res.length).equal(5);
    });

    it('delete a new User (delete-error-handler)', async () => {
      res = await request(API)
        .delete('/user')
        .set('Content-Type', 'application/json')
        .send(mocksUser.mockUser8);
      expect(res.status).equal(500);
    });

    it('delete a new User (delete)', async () => {
      res = await request(API)
        .delete('/user')
        .set('Content-Type', 'application/json')
        .send(mocksUser.mockUser4);
      expect(res.status).equal(200);
      res = await db.User.findAll();
      expect(res.length).equal(3);
    });
  });

  describe('Match position testing', () => {
    beforeEach(async () => {
      await db.User.create(mocksUser.mockUser1);
      await db.User.create(mocksUser.mockUser2);
      await db.Match.create(mocksMatch.mockMatch2);
      await db.Match.create(mocksMatch.mockMatch1);
    });
    it('New Position (post)', async () => {
      res = await request(API)
        .post('/positions')
        .set('Content-Type', 'application/json')
        .send(mocksPositions.mockPosition1);
      expect(res.status).equal(201);
      let test = await db.MatchPosition.findAll();
      expect(test.length).equal(1);
    });
    it('Getting All position  (get)', async () => {
      await db.MatchPosition.create(mocksPositions.mockPosition1);
      await db.MatchPosition.create(mocksPositions.mockPosition2);
      res = await request(API).get('/positions');
      expect(res.body[0].instruction).equal('runnnnn fasterrr');
      expect(res.statusCode).equal(200);
      expect(res.body.length).equal(2);
      res = await request(API).get('/users');
      expect(res.statusCode).equal(404);
    });
  });

  describe('check POSITION API before user Table has data (error handler)', async () => {
    it('Create a new Matches (post)', async () => {
      let res = await request(API)
        .post('/positions')
        .set('Content-Type', 'application/json')
        .send(mocksPositions.mockPosition3);
      expect(res.status).equal(500);
    });
  });
});
