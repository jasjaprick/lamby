const request = require('supertest');
const { expect } = require('chai');

const app = require('../index');
const API = 'http://localhost:3001';
const db = require('../model');

const mocksMatch = require('./mocksMatch');
const mocksPositions = require('./mocksPositions');

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

describe('check POSITION API', async () => {
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
