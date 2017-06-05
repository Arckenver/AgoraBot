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
				client.socket.terminate();
			}
			break;

		default:
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

	socket.on('close', () => {
		delete clients[id];
	});

	socket.on('message', (data) =>
	{
		var msg;
		try
		{
			msg = JSON.parse(data);
		}
		catch (e)
		{
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

	socket.on('close', () => {
		console.log(`socket ${id} closed !`)
		delete robots[id];
	});
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
		if (clients[id].socket.readyState === ws.OPEN)
		{
			clients[id].socket.send(data);
		}
	}
};

var onAction = () => {

	var actions = [];
	for (var id in clients)
	{
		actions.push(clients[id].action);
	}
	var action = null;
	if (actions.length)
	{
		action = actions[Math.floor(Math.random() * actions.length)];
	}

	for (var id in robots)
	{
		console.log("sending EXECUTE_ACTION to socket " + id)
		robots[id].socket.send(JSON.stringify({
			t: 'EXECUTE_ACTION',
			action: action
		}));
	}
};

module.exports = (port) => {
	var wss = new ws.Server({port: port});
	wss.on('connection', onConnection);
	setInterval(onUpdate, 1000);
	setInterval(onAction, 5000);
};
