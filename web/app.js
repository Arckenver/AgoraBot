/**
 *
 */

var express = require('express');

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/public', express.static(__dirname + '/public'));

app.use('/', (req, res) => {
	res.render('index', {});
});

module.exports = app;
