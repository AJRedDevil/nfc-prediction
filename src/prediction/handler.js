import multer from 'multer';
import path from 'path';
import XLSX from 'xlsx';

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
  if (gameweekExist(sheetName)) {
    return getJsonData(sheetName);
  }
  throw new Error('Incorrect Params');
};

module.exports = {
  uploadHandler: upload,
  fileHandler: getGameWeekPrediction,
};
