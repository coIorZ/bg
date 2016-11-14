import LoveLetter from '../../core/love_letter';
import { REMOVE_TABLE } from './table';
import Board, { fetchBoard, updateBoard, deleteBoard } from '../models/boards';

export default function(socket, io, store) {
	socket.on('client.loveletter.play.card', ({ tableId, cardId }) => {
		fetchBoard(tableId, board => {
			const newBoard = LoveLetter.playCard(board, cardId);
			updateAndEmitAll(newBoard, tableId, io);
		});
	});

	socket.on('client.loveletter.choose.player', ({ tableId, playerId }) => {
		fetchBoard(tableId, board => {
			const newBoard = LoveLetter.choosePlayer(board, playerId);
			updateAndEmitAll(newBoard, tableId, io);
		});
	});

	socket.on('client.loveletter.effect', payload => {
		fetchBoard(payload.tableId, board => {
			const newBoard = LoveLetter.effect(board, payload);
			updateAndEmitAll(newBoard, payload.tableId, io);
		});
	});

	socket.on('client.loveletter.round', ({ tableId }) => {
		fetchBoard(tableId, board => {
			const newBoard = LoveLetter.round(board);
			updateAndEmitAll(newBoard, tableId, io);
		});
	});

	socket.on('client.loveletter.game', ({ tableId }) => {
		deleteBoard(tableId, () => {
			Board.find((err, boards) => {
				if(err) throw err;
				store.dispatch({type: REMOVE_TABLE, payload: tableId});
				io.emit('server.table.remove', tableId);
			});
		});
	});
};

function updateAndEmitAll(board, tableId, io) {
	updateBoard(board, () => {
		io.sockets.in(tableId).emit(`server.loveletter.${board.data.phase}`, board);
	});
}

function updateAndEmit(board, tableId, socket) {
	updateBoard(board, () => {
		socket.emit(`server.loveletter.${board.data.phase}`, board);
	});
}