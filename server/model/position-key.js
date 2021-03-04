module.exports = (sequelize, DataTypes) => {
  const PositionKey = sequelize.define('PositionKey', {
    code: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    }
  });

  PositionKey.associate = model => {
    PositionKey.belongsToMany(model.Match, { through: 'MatchPosition', foreignKey: 'positionKeyId' })
  }

  return PositionKey;
}