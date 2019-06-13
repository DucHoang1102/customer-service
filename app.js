'use strict';

var express      = require('express'),
    httpError    = require('http-errors'),
    logger       = require('morgan'),
    bodyParser   = require('body-parser'),
    mongoose     = require('mongoose'),
    dotenv       = require('dotenv').config({path: './.env'});

var app = express();

var isProduction = process.env.APP_ENV === 'production';

// Normal express config defaults
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});

require('./models');
app.use(require('./routes'));

// Catch 404 and forward to error handle
app.use(function (req, res, next){
    next(httpError(404));
});

// Production error handler
if (isProduction || process.env.APP_DEBUG === 'false') {
    app.use(function (err, req, res, next){
        return res.sendStatus(404);
    });
}

// Start server
var server = app.listen( process.env.APP_PORT || 3000, function () {
    console.log('Run ' + this.address().port);
});

// For testing
module.exports = server;