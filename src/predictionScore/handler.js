import {read, write} from '../utils';

const filePath = gameweek => `predictionScores/GW${gameweek}`;
const writeHandler = (gameweek, data) =>
  write(filePath(gameweek), data, err => {
    if (err) throw new Error(err.message);
  });
const readHandler = gameweek => read(filePath(gameweek));

module.exports = {
  readHandler,
  writeHandler,
};
