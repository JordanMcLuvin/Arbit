const fs = require('fs');
const express = require("express");
require('dotenv').config();

const apiRouter = require('./routes/api');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });
}) 

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

 module.exports = app;
