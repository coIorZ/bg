export default function(socket, store) {
	socket.on('server.table.new', (action) => {
		store.dispatch(action);
	});

	socket.on('server.table.join', (action) => {
		store.dispatch(action);
	});

	socket.on('server.table.leave', (action) => {
		store.dispatch(action);
	});

	socket.on('server.table.remove', (action) => {
		store.dispatch(action);
	});
};
