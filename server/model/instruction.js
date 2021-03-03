const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
const Instruction = sequelize.define('Instruction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true
  },
  code: DataTypes.TEXT,
  details: DataTypes.STRING
});

return Instruction
}