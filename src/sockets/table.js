import _ from 'lodash';

import { 
	fetchTables, newTable, joinTable, leaveTable, removeTable, startTable, 
	setBoardVisible, updateBoard, clearLogs, updateLogs, setTableId, setResponse
} from '../actions';

export default function(socket, store) {
	socket.on('server.table', payload => store.dispatch(fetchTables(payload)));

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
			store.dispatch(clearLogs());
			store.dispatch(updateBoard(payload));
			store.dispatch(updateLogs(payload));
			store.dispatch(setBoardVisible(payload.table.game));
			store.dispatch(setTableId(payload.table._id));
			store.dispatch(setResponse(true));
		}
	});
};