/**
 *
 */

var http = require('http');

var app = require('./app');

var server = http.createServer(app);

require('./wss')(server);

server.listen(8000, () => {
	console.log('Server listening...');
});
