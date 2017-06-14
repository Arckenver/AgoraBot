/**
 *
 */

var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(favicon(__dirname + '/public/favicon.ico')))
app.use('/public', express.static(__dirname + '/public'));

app.use('/', (req, res) => {
	res.render('index', {});
});

module.exports = app;
