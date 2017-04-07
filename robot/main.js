
var client = Client();

client.onAction((actionType) => {
	switch (actionType)
	{
		case 'MOVE_FORWARD':
			onMoveForward();
			break;
	}
});
