/**
 *
 */

import { initChart } from './chart.js'
import VoteBtn from './votebtn.js'

const voteBtn = new VoteBtn("#voteBtn")

export default class Client
{
	constructor(addr)
	{
		this.socket = new WebSocket(addr)
		this.socket.onopen = this.onOpen.bind(this)
		this.socket.onclose = this.onClose.bind(this)
	}

	onMessage(e)
	{
		let msg = JSON.parse(e.data)

		console.log(msg)

		switch (msg.t)
		{
			case 'VOTE_CONFIRMED':
				voteBtn.setState('default')
				break;
		}
	}

	onOpen(e)
	{
		this.socket.send('CLIENT')
		this.socket.onmessage = (e) => {
			if (e.data == 'OK')
			{
				this.socket.onmessage = this.onMessage.bind(this)
				this.onConnected()
			}
			else
			{
				throw 'Connection to websocket server refused'
			}
		}
	}

	onConnected()
	{
		initChart()

		voteBtn.onClick(() => {
			voteBtn.setState('loading')

			this.socket.send(JSON.stringify({
				t: 'VOTE',
				action: $("#voteSelect > option:selected").val() || null
			}))
			// TODO send vote
		})
	}

	onClose(e)
	{

	}

	sendMessage(msg)
	{
		this.socket.send(JSON.stringify(msg))
	}
}
