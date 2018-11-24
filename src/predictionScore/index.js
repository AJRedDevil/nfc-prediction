import express from 'express';

import {
  readHandler,
  writeHandler,
  readOverallHandler,
  writeOverallHandler,
  readOverallGWHandler,
} from './handler';

const router = express.Router();

// middleware that is specific to predictionScore Router
router.use(function(req, res, next) {
  next();
});

router.get('/', (req, res) =>
  res.json({
    success: true,
    message: 'predictionScore',
  })
);

router.get('/:gameweek', async (req, res) => {
  const {gameweek} = req.params;
  const response = await readHandler(gameweek);
  return res.json(response);
});

router.post('/:gameweek', async (req, res) => {
  const {gameweek} = req.params;
  const data = req.body.data;
  try {
    await writeHandler(gameweek, data);
    return res.json({
      success: true,
      message: 'Successfully saved the predictions!',
    });
  } catch (e) {
    console.error(e.stack);
    return res.json({
      success: false,
      message: e.message,
    });
  }
});

const removeExtensions = files => files.map(filename => filename.split('.')[0]);
const removeGW = files => files.map(filename => parseInt(filename.slice(2)));
const sortGW = gws => gws.sort((a, b) => a - b);

router.get('/overall/gameweeks', async (req, res) => {
  const files = await readOverallGWHandler();
  const data = await Promise.resolve(files)
    .then(removeExtensions)
    .then(removeGW)
    .then(sortGW);
  return res.json({
    success: true,
    data,
  });
});

router.get('/overall', async (req, res) => {
  const response = await readOverallHandler();
  return res.json(response);
});

router.post('/overall', async (req, res) => {
  const data = req.body;
  try {
    await writeOverallHandler(data);
    return res.json({
      success: true,
      message: 'Successfully saved the overall prediction table!',
    });
  } catch (e) {
    console.error(e.stack);
    return res.json({
      success: false,
      message: e.message,
    });
  }
});

module.exports = router;
