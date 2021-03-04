

module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
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
  },
  assists: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  matches: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }

});

User.associate = model => {
  User.belongsToMany(model.Match, {through: 'MatchPosition', foreignKey: 'userId'})
}

return User
}
