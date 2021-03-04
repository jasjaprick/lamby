const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
const Instruction = sequelize.define('Instruction', {
  code: DataTypes.TEXT,
  details: DataTypes.STRING
});

return Instruction
}