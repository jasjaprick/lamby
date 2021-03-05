const db = require('../model')

exports.addMatchPosition = async (req, res) => {
  const { id, position, instruction, instructionClass } = req.body
  try {
    const match = await db.Match.findByPk(1)
    await match.addUser(id, { through: { position, instruction, instructionClass } })
    res.sendStatus(201)
  } catch (error) {
    res.status(500)
    console.log(error)
    res.send(error)
  }
}

exports.getMatchPositions = async (req, res) => {
  const id = req.body.id

  try {
    const currentMatch = await db.MatchPosition.findAll({ where: { matchId: id } })
    res.status(200)
    res.send(currentMatch)
  } catch (error) {
    res.status(500)
    console.log(error)
    res.send(error)
  }
}

exports.updatePlayerPosition = async (req, res) => {
  const { pos, id, player } = req.body

  try {
    const updatePos = await db.MatchPosition.update({ userId: player },
      {
        where: {
          position: pos, matchId: id
        }
      })
    res.status(202)
    res.send(updatePos)
  } catch (error) {
    res.status(500)
    console.log(error)
    res.send(error)
  }
}
