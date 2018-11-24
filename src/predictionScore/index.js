import express from 'express';

import {readHandler, writeHandler} from './handler';

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

module.exports = router;
