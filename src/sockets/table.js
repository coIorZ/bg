import _ from 'lodash';

import { newTable, joinTable, leaveTable, removeTable, startTable } from '../actions';

export default function(socket, store) {
	socket.on('server.table.new', payload => store.dispatch(newTable(payload)));

	socket.on('server.table.join', payload => store.dispatch(joinTable(payload)));

	socket.on('server.table.leave', payload => store.dispatch(leaveTable(payload)));

	socket.on('server.table.remove', payload => store.dispatch(removeTable(payload)));
	
	socket.on('server.table.start', payload => {
		store.dispatch(startTable(payload));
		if(_.some(payload.players, player => player._id === store.getState().client.user._id)) {
			socket.emit('client.board.join', payload._id);
		}
	});
};