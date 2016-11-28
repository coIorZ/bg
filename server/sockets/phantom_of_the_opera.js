import POTO from '../../core/phantom_of_the_opera';
import { REMOVE_TABLE } from './table';
import Board, { fetchBoard, updateBoard, deleteBoard } from '../models/boards';

export default function(socket, io, store) {
	socket.on('client.poto.play.card', ({ tableId, cardId }) => {
		fetchBoard(tableId, board => {
			const newBoard = POTO.playCard(board, cardId);
			updateAndEmitAll(newBoard, tableId, io);
		});
	});

	socket.on('client.poto.choose.action', payload => {
		fetchBoard(payload.tableId, board => {
			const newBoard = POTO.action(board, payload);
			updateAndEmitAll(newBoard, payload.tableId, io);
		});
	});

	socket.on('client.poto.game', ({ tableId }) => {
		deleteBoard(tableId, () => {
			store.dispatch({type: REMOVE_TABLE, payload: tableId});
			io.emit('server.table.remove', tableId);
		});
	});
};

function updateAndEmitAll(board, tableId, io) {
	updateBoard(board, () => {
		io.sockets.in(tableId).emit(`server.poto.${board.data.phase}`, board);
	});
}

function updateAndEmit(board, tableId, socket) {
	updateBoard(board, () => {
		socket.emit(`server.poto.${board.data.phase}`, board);
	});
}