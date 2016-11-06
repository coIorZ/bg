export const NEW_TABLE = 'NEW_TABLE';
export const JOIN_TABLE = 'JOIN_TABLE';

export default function(socket, io, store) {
	socket.on('client.table.new', (payload) => {
		const action = {
			type: NEW_TABLE,
			payload
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
};