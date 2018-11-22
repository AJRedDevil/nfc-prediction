import multer from 'multer';
import path from 'path';
import XLSX from 'xlsx';

import {read, write} from '../utils';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

const filePath = path.join(__dirname, '../../data/prediction.xlsx');
const getWorkbook = () => XLSX.readFile(filePath);
const getSheet = sheetName => getWorkbook().Sheets[sheetName];
const gameweekExist = sheetName =>
  getWorkbook().Sheets.hasOwnProperty(sheetName);
const getJsonData = sheetName => XLSX.utils.sheet_to_json(getSheet(sheetName));
const getGameWeekPrediction = gameweek => {
  const sheetName = `GW${gameweek}`;
  const response = read(sheetName);
  if (response.success) {
    return response;
  } else if (gameweekExist(sheetName)) {
    const data = getJsonData(sheetName);
    write(sheetName, data, err => console.error(err.stack));
    return data;
  } else {
    throw new Error('Incorrect Params');
  }
};

module.exports = {
  uploadHandler: upload,
  fileHandler: getGameWeekPrediction,
};
