const db = require('../model');
const { Op } = require('sequelize');

exports.addMatchPosition = async (req, res) => {
  let respond;
  const { matchId, userId, position, instruction } = req.body;
  try {
    const currentPosition = await db.MatchPosition.findAll({
      where: { matchId: matchId, position: position },
    });
    const match = await db.Match.findByPk(matchId);

    if (currentPosition) {
      await db.MatchPosition.destroy({
        where: {
          matchId: matchId,
          position: position,
        },
      });
      await match.addUser(userId, {
        through: { position, instruction },
      });
      res.status(201);
    } else {
      await match.addUser(userId, {
        through: { position, instruction },
      });
      res.status(201);
      res.send('user added');
    }
    res.send();
  } catch (error) {
    res.status(500);
    console.log(error);
    res.send(error);
  }
};

exports.getMatchPositions = async (req, res) => {
  try {
    const nextMatchArr = await db.Match.findAll({
      where: {
        date: { [Op.gte]: new Date() },
      },
      limit: 1,
      order: ['date'],
    });
    const nextMatch = nextMatchArr[0];
    const currentMatch = await db.MatchPosition.findAll({
      where: { matchId: nextMatch.id },
    });
    res.status(200);
    res.send(currentMatch);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.send(error);
  }
};
