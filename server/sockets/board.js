export default function(socket, io, store) {
	socket.on('client.board.join', (tableId) => {
		socket.join(tableId);
	});
};