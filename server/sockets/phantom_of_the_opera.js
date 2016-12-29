import POTO from '../../core/phantom_of_the_opera';
import { REMOVE_TABLE } from './table';
import { fetchBoard, updateBoard } from '../models/boards';
import { fetchLog, updateLog } from '../models/logs';

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
		io.sockets.in(tableId).emit(`server.poto.${board.data.phase}`, board);
	});
	if(board.data.logs.length) {
		fetchLog(tableId, (log) => {
			log.data = log.data.concat(board.data.logs);
			updateLog(log);
		});
	}
}
