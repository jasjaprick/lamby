const request = require('supertest');
const { expect } = require('chai');

const app = require('../index');
const API = 'http://localhost:3001';
const db = require('../model');

const mocksMatch = require('./mocksPositions');

describe('check POSITION API', async () => {
  it('check if POSITION`S table is emty (get)', async () => {
    const res = await request(API).get('/match');
    expect(res.statusCode).equal(200);
    expect(res.text).equal('[]');
  });

  it('Getting all MATCHS (get)', async () => {
    await db.MatchPosition.create(mocksMatch.mockPosition1);
    const res = await request(API).get('/positions');
    expect(res.statusCode).equal(200);
    expect(res.body[0].position).equal('cb');
    expect(res.body[0].matchId).equal(1);
    await db.MatchPosition.create(mocksMatch.mockPosition2);
    expect(res.statusCode).equal(200);
    expect(res.body[1].position).equal('GK');
    expect(res.body[1].matchId).equal(2);
  });

  it('Create a new Matches (post)', async () => {
    let res = await request(API)
      .post('/positions')
      .set('Content-Type', 'application/json')
      .send(mocksMatch.mockPosition3);
    expect(res.status).equal(201);
    let test = await db.Match.findAll();
    expect(test[2].dataValues.instruction).equal('are you a noob');
    expect(test.length).eql(3);

    res = await request(API)
      .post('/positions')
      .set('Content-Type', 'application/json')
      .send(mocksMatch.mockPosition4);
    expect(res.status).equal(201);
    let test = await db.Match.findAll();
    expect(test[3].dataValues.instruction).equal(
      'come onnnnn, do you know how to code?'
    );
    expect(test.length).eql(4);
  });

  it('Create a new Matches (post-error-handler)', async () => {
    let res = await request(API)
      .post('/match')
      .set('Content-Type', 'application/json')
      .send(mocksMatch.mockPosition4);
    expect(res.statusCode).qual(500);
  });
});
