import express from 'express';
import axios from 'axios';

import config from '../../config';
import {teamHandler} from './handler';

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

router.post('/teams', (req, res) =>
  axios(config.static)
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
    })
);

module.exports = router;
