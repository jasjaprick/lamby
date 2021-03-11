'use strict';
const db = require('../model');

exports.getPlayers = async (req, res) => {
  try {
    const user = await db.User.findAll({ where: { userType: 'PLAYER' } });
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

exports.addUser = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    playerNumber,
    userType,
    defaultPosition,
  } = req.body;
  try {
    db.User.create({
      email,
      password,
      firstName,
      lastName,
      playerNumber,
      userType,
      defaultPosition,
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.body.id;

  try {
    await db.User.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.User.findByPk(id);
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(1);
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
