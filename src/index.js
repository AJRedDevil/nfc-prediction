import express from 'express';

import fplStatic from './fplStatic';
import fixtures from './fixtures';
import prediction from './prediction';

const app = express();
const PORT = process.env.PORT || 3000;

// Logger
const log = str => console.log(JSON.stringify(str));
const myLogger = function(req, res, next) {
  log(`${Date.now()} ${req.ip} ${req.method} ${req.url}`);
  next();
};
app.use(myLogger);

// Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/fplstatic', fplStatic);
app.use('/fixtures', fixtures);
app.use('/prediction', prediction);

// Error Handler
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// No Route Found
// eslint-disable-next-line no-unused-vars
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, () =>
  console.log(`NFC Prediction server listening on port ${PORT}!`)
);
