module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    playerNumber: DataTypes.INTEGER,
    defaultPosition: DataTypes.TEXT,
    userType: {
      type: DataTypes.TEXT,
      defaultValue: 'PLAYER',
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
    },
  });

  User.associate = (model) => {
    User.belongsToMany(model.Match, {
      through: model.MatchPosition,
      foreignKey: 'userId',
    });
  };

  return User;
};
