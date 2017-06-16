/**
 *
 */

import { initChart } from './chart.js'
import VoteBtn from './votebtn.js'
import actions from './actions.js'

const voteBtn = new VoteBtn("#voteBtn")

export default class Client
{
	constructor(addr)
	{
		this.socket = new WebSocket(addr)
		this.socket.onopen = this.onOpen.bind(this)
		this.socket.onclose = this.onClose.bind(this)

		this.chart = null
	}

	onMessage(e)
	{
		let msg = JSON.parse(e.data)

		switch (msg.t)
		{
			case 'VOTE_CONFIRMED':
				voteBtn.setState('default')
				$("#voteIndicator").text(actions[msg.action])
				break
			case 'UPDATE_VOTES':
				if (this.chart)
				{
					var chartData = this.chart.data.datasets[0].data
					chartData[0] = msg.votes[null] || 0
					chartData[1] = msg.votes.MOVE_FORWARD || 0
					chartData[2] = msg.votes.TURN_RIGHT || 0
					chartData[3] = msg.votes.TURN_LEFT || 0
					chartData[4] = msg.votes.MOVE_BACKWARD || 0
					chartData[5] = msg.votes.LOOK_AROUND || 0
					this.chart.update()
				}
				break
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
		initChart((chart) => {
			this.chart = chart

			voteBtn.setState('default')
			$("#voteIndicator").text(actions[null])

			voteBtn.onClick(() => {
				voteBtn.setState('loading')

				this.socket.send(JSON.stringify({
					t: 'VOTE',
					action: $("#voteSelect > option:selected").val() || null
				}))
			})
		})
	}

	onClose(e)
	{
		voteBtn.setState('error')
		$("#alerts").append(
			'<div class="alert alert-danger">' +
				"You've been disconnected from the server. Press F5 to reconnect." +
			'</div>'
		)
	}

	sendMessage(msg)
	{
		this.socket.send(JSON.stringify(msg))
	}
}
