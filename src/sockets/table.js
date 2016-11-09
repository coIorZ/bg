import _ from 'lodash';

import { newTable, joinTable, leaveTable, removeTable, startTable, setBoardVisible, boardTable } from '../actions';

export default function(socket, store) {
	socket.on('server.table.new', payload => store.dispatch(newTable(payload)));

	socket.on('server.table.join', payload => store.dispatch(joinTable(payload)));

	socket.on('server.table.leave', payload => store.dispatch(leaveTable(payload)));

	socket.on('server.table.remove', payload => store.dispatch(removeTable(payload)));
	
	socket.on('server.table.start', payload => {
		store.dispatch(startTable(payload));
		if(_.includes(payload.players, store.getState().client.user._id)) {
			socket.emit('client.table.board', payload._id);
		}
	});

	socket.on('server.table.board', payload => {
		if(payload) {
			store.dispatch(boardTable(payload));
			store.dispatch(setBoardVisible(true));
		}
	});
};