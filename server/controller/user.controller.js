'use strict';
const db = require('../model');

exports.getUsers = async (req, res) => {
  try {
    const user = await db.User.findAll();
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

exports.addUser = async (req, res) => {
  const { email, password, firstName, lastName, playerNumber } = req.body;
  try {
    const user = db.User.create({ email, password, firstName, lastName, playerNumber });

    res.sendStatus(201);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}