import LoveLetter from '../../core/love_letter';
import { REMOVE_TABLE } from './table';
import { fetchBoard, updateBoard } from '../models/boards';
import { fetchLog, updateLog } from '../models/logs';

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
		fetchBoard(tableId, (board) => {
			board.table.status = 2;
			updateBoard(board, () => {
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
	if(board.data.logs.length) {
		fetchLog(tableId, (log) => {
			log.data = log.data.concat(board.data.logs);
			updateLog(log);
		});
	}
}
