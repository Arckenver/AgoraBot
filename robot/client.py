import websocket
import thread
import json
import actions


def on_open(ws):
	print("Websocket opened")

	def run(*args):
		ws.send("ROBOT")

		while True:
			pass

		print("Websocket thread terminating")

	thread.start_new_thread(run, ())


def on_message(ws, data):
	if data == "OK":
		return

	try:
		msg = json.loads(data)
	except ValueError as err:
		print err

	t = msg["t"]

	if t == "EXECUTE_ACTION":
		actions.execute_action(msg["action"])
	else:
		print "Invalid msg type: " + t


def on_error(ws, error):
	print(error)


def on_close(ws):
	print("Websocket closed")


def connect(addr):
	print("Connecting to " + addr)

	websocket.enableTrace(True)
	ws = websocket.WebSocketApp(addr,
		on_message=on_message,
		on_error=on_error,
		on_close=on_close,
		on_open=on_open)
	ws.run_forever()

	return ws
