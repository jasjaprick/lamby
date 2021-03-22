module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    homeTeam: {
      type: DataTypes.STRING,
      defaultValue: 'Lokomotiv Amby III',
    },
    awayTeam: DataTypes.STRING,
    formation: {
      type: DataTypes.STRING,
      defaultValue: '4-3-3',
    },
    date: DataTypes.DATE,
    venue: DataTypes.STRING,
  });

  Match.associate = model => {
    Match.belongsToMany(model.User, {
      through: model.MatchPosition,
      foreignKey: 'matchId',
    });
  };

  return Match;
};
