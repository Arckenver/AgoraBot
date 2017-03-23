/**
 *
 */

var ws = require('ws');

const onConnection = (socket) => {
	socket.send("ok");
	socket.on('message', (msg) => {
		console.log(msg);
	});
};

module.exports = (server) => {
	var wss = new ws.Server({server: server});
	wss.on('connection', onConnection);
	return wss;
};
