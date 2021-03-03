const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  firstName: DataTypes.TEXT,
  lastName: DataTypes.TEXT,
  playerNumber: DataTypes.INTEGER,
  userType: {
    type: DataTypes.TEXT,
    defaultValue: 'PLAYER'
  },
  goals: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  assists: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  matches: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }

});

return User
}