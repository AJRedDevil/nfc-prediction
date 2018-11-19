import express from 'express';

import {uploadHandler} from './handler';

const router = express.Router();
const log = str => console.log(JSON.stringify(str));

router.use(function(req, res, next) {
  log(`Time: ${Date.now()} App: prediction URL: ${req.originalUrl}`);
  next();
});

router.get('/', (req, res) =>
  res.json({
    success: true,
    message: 'prediction',
  })
);

router.post('/upload', uploadHandler.single('prediction'), (req, res) => {
  if (!req.file) {
    res.json({
      success: false,
      message: 'Error in file upload',
    });
  } else {
    return res.json({
      success: true,
      message: 'Successfully uploaded file',
    });
  }
});

module.exports = router;
