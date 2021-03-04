'use strict';
const db = require('../model');

exports.getPosKey = async (req, res) => {
  try {
    const posKey = await db.PositionKey.findAll();
    res.status(200);
    res.send(posKey);
  } catch (error) {
    res.status(500);
    console.log(error)
    res.send(error)
  }
}

exports.addPosKey = async (req, res) => {
  const { pos, type } = req.body
  try {
    await db.PositionKey.create({code: pos, type: type});
    //console.log(pos)
    res.sendStatus(201);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}