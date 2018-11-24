import express from 'express';

import {
  readOverallHandler,
  writeOverallHandler,
  readOverallGWHandler,
} from './handler';

const router = express.Router();

// middleware that is specific to overall Router
router.use(function(req, res, next) {
  next();
});

router.get('/', (req, res) =>
  res.json({
    success: true,
    message: 'overall',
  })
);

router.post('/table', async (req, res) => {
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

router.get('/table', async (req, res) => {
  const response = await readOverallHandler();
  console.log(response);
  return res.json({
    success: true,
    data: response.success ? response.data.table : [],
  });
});

const removeExtensions = files => files.map(filename => filename.split('.')[0]);
const removeGW = files => files.map(filename => parseInt(filename.slice(2)));
const sortGW = gws => gws.sort((a, b) => a - b);

router.get('/gameweeks', async (req, res) => {
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

router.get('/calculatedgameweeks', async (req, res) => {
  const response = await readOverallHandler();
  return res.json({
    success: true,
    data: response.success ? response.data.gameweeks : [],
  });
});

module.exports = router;
