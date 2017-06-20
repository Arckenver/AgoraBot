/**
 *
 */

require('../less/main.less');

import Client from './client.js'

window.onload = () => {
	let client = new Client("ws://agorabot.imageisima.fr:8000")
}
