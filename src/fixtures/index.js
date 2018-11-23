import express from 'express';
import axios from 'axios';

import config from '../../config';
import {fixturesHandler} from './handler';
import {read} from '../utils';

const router = express.Router();

// middleware that is specific to fixtures Router
router.use(function(req, res, next) {
  next();
});

router.get('/', (req, res) =>
  res.json({
    success: true,
    message: 'fixtures',
  })
);

router.get('/:gameweek', (req, res) => {
  const gameweek = req.params.gameweek;
  const response = read(`fixtures/fixture${gameweek}`);
  if (response.success) {
    return res.json(response);
  } else {
    axios(`${config.event}${gameweek}`)
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
      });
  }
});

module.exports = router;
