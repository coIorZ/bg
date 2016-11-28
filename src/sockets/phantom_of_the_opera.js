import { updateBoard, updateLogs } from '../actions';

export default function(socket, store) {
	socket.on('server.poto.play.card', payload => {
		store.dispatch(updateBoard(payload));
		store.dispatch(updateLogs(payload));
	});

	socket.on('server.poto.choose.action', payload => {
		store.dispatch(updateBoard(payload));
		store.dispatch(updateLogs(payload));
	});

	socket.on('server.poto.game', payload => {
		store.dispatch(updateBoard(payload));
		store.dispatch(updateLogs(payload));
	});
};