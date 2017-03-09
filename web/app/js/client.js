/**
 *
 */

export default class Client
{
	constructor(addr)
	{
		this.socket = new WebSocket(addr)
		this.socket.onopen = this.onConnected.bind(this)
		this.socket.onmessage = this.onMessage.bind(this)
		this.socket.onclose = this.onClose.bind(this)
	}

	onMessage(e)
	{

	}

	onConnected(e)
	{

	}

	onClose(e)
	{

	}
}
