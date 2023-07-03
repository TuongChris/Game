module.exports = (req, res, next) => {
  const players = require("./players.json");
  const sortedPlayers = players
    .sort((a, b) => a.timePlayed - b.timePlayed)
    .slice(0, 10);
  res.json(sortedPlayers);
};
