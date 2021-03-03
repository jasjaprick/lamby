
const db = require('../model')

exports.getPosKey = async (req, res) => {
  try {
    const posKey = await db.PositionKeys.findAll();
    res.status(200);
    res.send(posKey);
  } catch (error) {
    res.status(500);
    console.log(error)
    res.send(error)
  }
}

exports.addPosKey = async (req, res) => {
  const { pos } = req.body
  try {
    await db.PositionKeys.create({code: pos});
    console.log(code)
    res.sendStatus(201);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}