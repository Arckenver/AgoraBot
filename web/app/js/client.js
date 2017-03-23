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
		this.socket.onopen = this.onConnected.bind(this)
		this.socket.onmessage = this.onMessage.bind(this)
		this.socket.onclose = this.onClose.bind(this)
	}

	onMessage(e)
	{
		let msg = JSON.parse(e.data)

		console.log(msg)
	}

	sendMessage(msg)
	{
		this.socket.send(JSON.stringify(msg))
	}

	onConnected(e)
	{
		initChart()

		voteBtn.onClick(() => {
			voteBtn.setState('loading')
			// TODO send vote
		})
	}

	onClose(e)
	{

	}
}
