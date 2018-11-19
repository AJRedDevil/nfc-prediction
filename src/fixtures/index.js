import express from 'express';
import axios from 'axios';

import config from '../../config';
import {fixturesHandler} from './handler';

const router = express.Router();
const log = str => console.log(JSON.stringify(str));

router.use(function(req, res, next) {
  log(`Time: ${Date.now()} App: fixtures URL: ${req.originalUrl}`);
  next();
});

router.get('/', (req, res) =>
  res.json({
    success: true,
    message: 'fixtures',
  })
);

router.post('/:gameweek', (req, res) =>
  axios(`${config.event}${req.params.gameweek}`)
    .then(response => response.data)
    .then(fixturesHandler)
    .then(fixtures =>
      res.json({
        success: true,
        data: fixtures,
      })
    )
    .catch(e => {
      console.error(e.message);
      res.json({
        success: false,
        message: e.message,
      });
    })
);

module.exports = router;
