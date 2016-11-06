export const NEW_TABLE = 'NEW_TABLE';

export default function(socket, store) {
	socket.on('server.table.new', (action) => {
		store.dispatch(action);
	});
};
