const request = require('supertest');
const { expect } = require('chai');

const app = require('../index');
const API = 'http://localhost:3001';
const db = require('../model');

const mocksMatch = require('./mocksMatch');
const mocksPositions = require('./mocksPositions');
const mocksUser = require('./mocksUser');

//match ----------------------------------------------------------
describe('check MATCH`S table', async () => {
  it('check if MATCH`s table is emty (get)', async () => {
    const res = await request(API).get('/match');
    expect(res.statusCode).equal(200);
    expect(res.text).equal('[]');
  });

  it('Getting Next Match (get)', async () => {
    await request(API).get('/match');
    await db.Match.create(mocksMatch.mockMatch5);
    await db.Match.create(mocksMatch.mockMatch6);
    const res = await request(API).get('/match');
    expect(res.statusCode).equal(200);
    expect(res.body[1].venue).equal('paris');
    expect(res.body[1].id).equal(2);
  });

  it('Getting all MATCHS (get)', async () => {
    await db.Match.create(mocksMatch.mockMatch1);
    const res = await request(API).get('/match');
    expect(res.statusCode).equal(200);
    expect(res.body[2].venue).equal('Old Trafford');
    expect(res.body[2].id).equal(3);
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

//Position error-------------------------------------------------------------------
describe('check POSITION API before user yable has data (error handler)', async () => {
  it('check if POSITION`S table is emty (get)', async () => {
    const res = await request(API).get('/positions');
    expect(res.statusCode).equal(200);
    expect(res.text).equal('[]');
  });

  it('Create a new Matches (post)', async () => {
    let res = await request(API)
      .post('/positions')
      .set('Content-Type', 'application/json')
      .send(mocksPositions.mockPosition3);
    expect(res.status).equal(500);
  });

  it('Getting all POSITION before having data in USER DB(get)', async () => {
    const res = await request(API).get('/positions');
    expect(res.statusCode).equal(200);
    expect(res.text).equal('[]');
  });
});

//user-----------------------------------------------------------------------------
describe('check MATCH`S table', async () => {
  it('check if User`s table is emty (get)', async () => {
    const res = await request(API).get('/user');
    expect(res.statusCode).equal(200);
    expect(res.text).equal('[]');
  });

  it('Getting User by Id (get)', async () => {
    await request(API).get('/user');
    await db.User.create(mocksUser.mockUser1);
    const res = await request(API).get('/user/1');
    expect(res.statusCode).equal(200);
    expect(res.body.email).equal('yani@gmail.com');
    expect(res.body.id).equal(1);
  });

  it('Getting All Users  (get)', async () => {
    await request(API).get('/user');
    await db.User.create(mocksUser.mockUser2);
    await db.User.create(mocksUser.mockUser3);
    await db.User.create(mocksUser.mockUser4);
    const res = await request(API).get('/user');
    expect(res.statusCode).equal(200);
    expect(res.body[3].playerNumber).equal(4);
    expect(res.body.length).equal(4);
  });
  it('Getting All Users  (get-error)', async () => {
    await request(API).get('/users');
    const res = await request(API).get('/users');
    expect(res.statusCode).equal(404);
  });
});
