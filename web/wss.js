/**
 *
 */

var ws = require('ws');
var uuidv1 = require('uuid/v1');

var Server = class {

	constructor(server)
	{
		this.clients = {};
		this.robots = {};

		this.wss = new ws.Server({server: server});
		this.wss.on('connection', this.onConnection.bind(this));

		setInterval(this.onAction.bind(this), 10000);
	}

	onVote(socket, action)
	{
		socket.vote = action;
		socket.send(JSON.stringify({
			t: 'CONFIRM_VOTE'
		}));
	}

	onAction()
	{

	}

	onConnection(socket)
	{
		socket.on('message', ((data) =>
		{
			socket.id = uuidv1();

			switch (data)
			{
				case 'CLIENT':
					this.clients[socket.id] = socket;
					socket.vote = null;
					break;
				case 'ROBOT':
					this.robots[socket.id] = socket;
					break;
				default:
					socket.terminate();
					return;
			}

			socket.send('OK');

			socket.on('message', ((data) =>
			{
				try
				{
					var msg = JSON.parse(data);
				}
				catch (e)
				{
					this.removeClient(socket, true);
					return;
				}

				switch (msg.t)
				{
					case 'VOTE':
						this.onVote(socket, msg.action);
						break;
					default:
						this.removeClient(socket, true);
						return;
				}
			}).bind(this));
		}).bind(this));
	}

	removeClient(socket, forceDisconnection)
	{
		delete this.clients[socket.id];

		if (forceDisconnection)
		{
			socket.terminate();
		}
		else
		{
			socket.close();
		}
	}
};

module.exports = (httpServer) => {
	return new Server(httpServer);
};
