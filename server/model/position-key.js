module.exports = (sequelize, DataTypes) => sequelize.define('PositionKeys', {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING,
    }
  });
