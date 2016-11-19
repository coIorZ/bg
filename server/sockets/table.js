import mongoose from 'mongoose';

import { getCore } from '../../core';
import Board from '../models/boards';

export const NEW_TABLE = 'NEW_TABLE';
export const JOIN_TABLE = 'JOIN_TABLE';
export const LEAVE_TABLE = 'LEAVE_TABLE';
export const REMOVE_TABLE = 'REMOVE_TABLE';
export const START_TABLE = 'START_TABLE';
export const BOARD_TABLE = 'BOARD_TABLE';

export default function(socket, io, store) {
	socket.on('client.table.new', payload => {
		const table = {
			_id: mongoose.Types.ObjectId(),
			host: payload.userId,
			players: [payload.userId],
			game: payload.gameId,
			started: false
		};
		const action = {
			type: NEW_TABLE,
			payload: table
		};
		store.dispatch(action);
		io.emit('server.table.new', table);
	});

	socket.on('client.table.join', payload => {
		const action = {
			type: JOIN_TABLE,
			payload
		};
		store.dispatch(action);
		io.emit('server.table.join', payload);
	});

	socket.on('client.table.leave', payload => {
		const action = {
			type: LEAVE_TABLE,
			payload
		};
		store.dispatch(action);
		io.emit('server.table.leave', payload);
	});

	socket.on('client.table.remove', payload => {
		const action = {
			type: REMOVE_TABLE,
			payload
		};
		store.dispatch(action);
		io.emit('server.table.remove', payload);
	});

	socket.on('client.table.start', payload => {
		const action = {
			type: START_TABLE,
			payload,
		};
		store.dispatch(action);
		let board = new Board(getCore(payload.game).create({...payload}));
		board.table.started = true;
		board.save((err) => {
			if(err) throw 'database error: create board';
			io.emit('server.table.start', payload);
		});
	});

	socket.on('client.table.board', tableId => {
		socket.join(tableId);
		Board.findOne({'table._id': tableId}, (err, payload) => {
			socket.emit('server.table.board', payload);
		});
	});

	socket.on('client.board.leave', tableId => {
		socket.leave(tableId);
	});
};