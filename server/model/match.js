const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true
    },
    formation: {
      type: DataTypes.STRING,
      defaultValue: '4-3-3'
    },
    dateAndTime: DataTypes.STRING,
    venue: DataTypes.STRING
  });

  return Match
}