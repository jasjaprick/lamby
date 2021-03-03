const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
const MatchPosition = sequelize.define('MatchPosition', {
  id: {
    type: DataTypes.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true
  },
  playerId: DataTypes.UUID,
  matchId: DataTypes.UUID,
  positionId: DataTypes.UUID,
  instructionID: DataTypes.UUID
});

return MatchPosition
}