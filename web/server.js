/**
 *
 */

var http = require('http');

var app = require('./app');

var server = http.createServer(app);

require('./wss')(8000);

server.listen(7807, () => {
	console.log('Server listening...');
});
