/**
 *
 */

require('../less/main.less');

import Client from './client.js'

window.onload = () => {
	let client = new Client("ws://localhost:8000")
}
