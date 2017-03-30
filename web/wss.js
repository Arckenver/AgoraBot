/**
 *
 */

var ws = require('ws');
var uuidv1 = require('uuid/v1');

var actions = [
	'MOVE_FORWARD',
	'TURN_RIGHT',
	'TURN_LEFT',
	'TURN_RIGHT_BACKWARD',
	'TURN_LEFT_BACKWARD'
];

var clients = {};
var robots = {};

var onClientMessage = (client, msg) =>
{
	console.log(msg)
	switch (msg.t)
	{
		case 'VOTE':
			if (msg.action === null || actions.indexOf(msg.action) != -1)
			{
				client.action = msg.action;
				client.socket.send(JSON.stringify({
					t: 'VOTE_CONFIRMED',
					action: client.action
				}));
			}
			else
			{
				delete clients[client.id];
				client.socket.terminate();
			}
			break;

		default:
			delete clients[client.id];
			client.socket.terminate();
			return;
	}
};

var onClientConnection = (socket) =>
{
	var id = uuidv1();
	var client = {
		id: id,
		socket: socket,
		action: null
	};
	clients[id] = client;
	socket.on('message', (data) =>
	{
		var msg;
		try
		{
			msg = JSON.parse(data);
		}
		catch (e)
		{
			delete clients[id];
			socket.terminate();
			return;
		}
		onClientMessage(client, msg);
	});
};

var onRobotConnection = (socket) =>
{
	var id = uuidv1();
	robots[id] = {
		id: id,
		socket: socket
	};
};

var onConnection = (socket) =>
{
	socket.on('message', ((data) =>
	{
		socket.removeAllListeners('message');
		switch (data)
		{
			case 'CLIENT':
				onClientConnection(socket);
				break;
			case 'ROBOT':
				onRobotConnection(socket);
				break;
			default:
				socket.terminate();
				return;
		}
		socket.send('OK');
	}));
};

var onUpdate = () => {
	var votes = {};

	for (var id in clients)
	{
		if (!votes.hasOwnProperty(clients[id].action))
		{
			votes[clients[id].action] = 0;
		}
		votes[clients[id].action]++;
	}

	var data = JSON.stringify({
		t: 'UPDATE_VOTES',
		votes: votes
	});

	for (var id in clients)
	{
		clients[id].socket.send(data);
	}
};

var onAction = () => {
	var actions = Object.values(this.clients)
		.map((client) => client.action)
		.filter((action) => action != null);


};

module.exports = (server) => {
	var wss = new ws.Server({server: server});
	wss.on('connection', onConnection);
	setInterval(onUpdate, 1000);
};
