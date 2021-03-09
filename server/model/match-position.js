
module.exports = (sequelize, DataTypes) => {
  const MatchPosition = sequelize.define('MatchPosition', {
    matchId: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    position: DataTypes.TEXT,
    instruction: DataTypes.STRING
  }, { timestamps: false })

  return MatchPosition
}
