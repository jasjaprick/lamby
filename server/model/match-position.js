
module.exports = (sequelize, DataTypes) => {
  const MatchPosition = sequelize.define('MatchPosition', {
    position: DataTypes.TEXT,
    instruction: DataTypes.STRING,
    instructionClass: DataTypes.TEXT
  }, { timestamps: false });

  return MatchPosition;
}
