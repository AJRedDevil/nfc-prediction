import express from 'express';
import axios from 'axios';

import config from '../../config';
import {teamHandler} from './handler';

const router = express.Router();
const log = str => console.log(JSON.stringify(str));

// middleware that is specific to fplStatic Router
router.use(function(req, res, next) {
  log(`Time: ${Date.now()} App: fplStatic URL: ${req.originalUrl}`);
  next();
});

router.get('/', (req, res) =>
  res.json({
    success: true,
    message: 'fplStatic',
  })
);

router.post('/loadteams', (req, res) => {
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
      res.send(e.message);
    });
});

module.exports = router;
