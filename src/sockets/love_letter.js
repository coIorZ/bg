import { updateBoard, updateLogs } from '../actions';

export default function(socket, store) {
	socket.on('server.loveletter.play.card', payload => {
		store.dispatch(updateBoard(payload));
		store.dispatch(updateLogs(payload));
	});

	socket.on('server.loveletter.choose.player', payload => {
		store.dispatch(updateBoard(payload));
		store.dispatch(updateLogs(payload));
	});

	socket.on('server.loveletter.effect', payload => {
		store.dispatch(updateBoard(payload));
		store.dispatch(updateLogs(payload));
	});

	socket.on('server.loveletter.round', payload => {
		store.dispatch(updateBoard(payload));
		store.dispatch(updateLogs(payload));
	});

	socket.on('server.loveletter.game', payload => {
		store.dispatch(updateBoard(payload));
		store.dispatch(updateLogs(payload));
	});
};