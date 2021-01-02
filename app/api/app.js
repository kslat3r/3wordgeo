const express = require('express');
const logger = require('morgan');

const wordsRouter = require('./routes/words');
const latlonRouter = require('./routes/latlon');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1.0', wordsRouter);
app.use('/api/v1.0', latlonRouter);

module.exports = app;
