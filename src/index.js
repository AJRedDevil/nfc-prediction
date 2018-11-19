import express from 'express';

import fplStatic from './fplStatic';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/fplstatic', fplStatic);

// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// eslint-disable-next-line no-unused-vars
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, () =>
  console.log(`NFC Prediction server listening on port ${PORT}!`)
);
