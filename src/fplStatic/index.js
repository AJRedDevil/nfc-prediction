import express from 'express';
import axios from 'axios';

import config from '../../config';
import {teamHandler, eventHandler} from './handler';
import {read} from '../utils';

const router = express.Router();

// middleware that is specific to fplStatic Router
router.use(function(req, res, next) {
  next();
});

router.get('/', (req, res) =>
  res.json({
    success: true,
    message: 'fplStatic',
  })
);

router.get('/teams', async (req, res) => {
  const response = await read('teams');
  if (response.success) {
    return res.json(response);
  } else {
    return axios(config.static)
      .then(response => response.data)
      .then(teamHandler)
      .then(teams =>
        res.json({
          success: true,
          data: teams,
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

router.get('/finishedgameweeks', (req, res) =>
  axios(config.static)
    .then(response => response.data)
    .then(eventHandler)
    .then(events =>
      res.json({
        success: true,
        data: events,
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
