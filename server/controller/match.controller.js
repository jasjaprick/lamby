'use strict';
const db = require('../model');

exports.getMatches = async (req, res) => {
  try {
    const match = await db.Match.findAll({ include: [db.User]});
    res.status(200);
    res.send(match);
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}

exports.addMatch = async (req, res) => {
  const { date, venue } = req.body;
  try {
    const match = await db.Match.create({ date, venue});
    console.log(match.addUser)
    await match.addUser(1);
    res.sendStatus(201)
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}