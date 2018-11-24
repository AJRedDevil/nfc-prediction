import {read, write, readDir} from '../utils';

const filePath = gameweek => `predictionScores/GW${gameweek}`;
const writeHandler = (gameweek, data) =>
  write(filePath(gameweek), data, err => {
    if (err) throw new Error(err.message);
  });
const readHandler = gameweek => read(filePath(gameweek));

const overallFilePath = 'overall';
const writeOverallHandler = data =>
  write(overallFilePath, data, err => {
    if (err) throw new Error(err.message);
  });
const readOverallHandler = () => read(overallFilePath);

const readOverallGWHandler = () => readDir('predictionScores');

module.exports = {
  readHandler,
  writeHandler,
  writeOverallHandler,
  readOverallHandler,
  readOverallGWHandler,
};
