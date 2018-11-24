import {read, write, readDir} from '../utils';

const overallFilePath = 'overall/table';
const writeOverallHandler = data =>
  write(overallFilePath, data, err => {
    if (err) throw new Error(err.message);
  });
const readOverallHandler = () => read(overallFilePath);

const readOverallGWHandler = () => readDir('predictionScores');

module.exports = {
  writeOverallHandler,
  readOverallHandler,
  readOverallGWHandler,
};
