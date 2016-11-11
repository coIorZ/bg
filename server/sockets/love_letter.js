import LoveLetter from '../../core/love_letter';
import { fetchBoardData } from '../models/boards';

export default function(socket, io, store) {
	socket.on('client.loveletter.draw', (tableId, playId) => {
		fetchBoardData(tableId, data => {

		});
	});
};