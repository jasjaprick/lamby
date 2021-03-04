'use strict';
const db = require('../model');

exports.getInstructions = async (req, res) => {
  try {
    const instruction = await db.Instruction.findAll();
    res.status(200);
    res.send(instruction);
  } catch (error) {
    res.status(500);
    res.send(error)
  }
}

exports.addInstruction = async (req, res) => {
  const { code, details } = req.body;
  try {
    await db.Instruction.create({code, details});
    res.sendStatus(201);
  } catch (error) {
    res.status(500);
    res.send(error)
  }
}