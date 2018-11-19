import express from 'express';

import {uploadHandler} from './handler';

const router = express.Router();

// middleware that is specific to prediction Router
router.use(function(req, res, next) {
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
