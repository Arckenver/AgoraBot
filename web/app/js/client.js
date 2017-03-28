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
			case 'CONFIRM_VOTE':
				voteBtn.setState('default')
				break;
		}
	}

	sendMessage(msg)
	{
		this.socket.send(JSON.stringify(msg))
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
				throw 'Connection to websocket server refused';
			}
		}
	}

	onConnected()
	{
		initChart()

		voteBtn.onClick(() => {
			console.log('click !')
			voteBtn.setState('loading')
			// TODO send vote
		})
	}

	onClose(e)
	{

	}
}
