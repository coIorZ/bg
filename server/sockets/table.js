import mongoose from 'mongoose';

import { NEW_TABLE, JOIN_TABLE, LEAVE_TABLE, REMOVE_TABLE } from '../../src/sockets/type';

export default function(socket, io, store) {
	socket.on('client.table.new', (payload) => {
		const table = {
			_id: mongoose.Types.ObjectId(),
			host: payload.user,
			players: {
				[payload.user._id]: payload.user
			},
			game: payload.game,
			started: false
		};
		const action = {
			type: NEW_TABLE,
			payload: table
		};
		store.dispatch(action);
		io.emit('server.table.new', action);
	});

	socket.on('client.table.join', (payload) => {
		const action = {
			type: JOIN_TABLE,
			payload
		};
		store.dispatch(action);
		io.emit('server.table.join', action);
	});

	socket.on('client.table.leave', (payload) => {
		const action = {
			type: LEAVE_TABLE,
			payload
		};
		store.dispatch(action);
		io.emit('server.table.leave', action);
	});

	socket.on('client.table.remove', (payload) => {
		const action = {
			type: REMOVE_TABLE,
			payload
		};
		store.dispatch(action);
		io.emit('server.table.remove', action);
	});
};