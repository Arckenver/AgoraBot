import websocket
import thread

def on_open(ws):
	print("Websocket opened")

	def run(*args):
		ws.send("ROBOT")

		while True:
			print("continue")

		print("Websocket thread terminating")

	thread.start_new_thread(run, ())

def on_message(ws, message):
	print(message)

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
