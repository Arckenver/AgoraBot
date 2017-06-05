/**
 *
 */

require('../less/main.less');

import Client from './client.js'

window.onload = () => {
	let client = new Client("ws://142.4.214.198:8000")
}
