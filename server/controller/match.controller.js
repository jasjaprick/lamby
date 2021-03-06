
const db = require('../model')
const { Op } = require('sequelize')

exports.getMatches = async (req, res) => {
  try {
    const match = await db.Match.findAll({ include: [db.User] })
    res.status(200)
    res.send(match)
  } catch (error) {
    console.log(error)
    res.status(500)
    res.send(error)
  }
}

exports.getNextMatch = async (req, res) => {
  try {
    const nextMatch = await db.Match.findAll({
      where: {
        date: { [Op.gte]: new Date() }
      },
      limit: 1,
      order: ['date']
    })
    res.status(200)
    res.send(nextMatch[0])
  } catch (error) {
    console.log(error)
    res.status(500)
    res.send(error)
  }
}

exports.addMatch = async (req, res) => {
  const { awayTeam, date, venue } = req.body
  try {
    await db.Match.create({ awayTeam, date, venue })
    res.sendStatus(201)
  } catch (error) {
    res.status(500)
    res.send(error)
  }
}
