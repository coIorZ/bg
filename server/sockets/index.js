import { createStore } from 'redux';

import table from './table';
import loveLetter from './love_letter';

export default function(io, store) {
	io.on('connection', (socket) => {
		console.log('---------- a socket connected ----------');

		socket.emit('server.game', store.getState().games);
		socket.emit('server.user', store.getState().users);

		socket.on('client.user.login', payload => {
			store.dispatch({type: 'USER_ONLINE', payload});
			socket.emit('server.table', store.getState().tables);
			io.emit('server.user', store.getState().users);
		});

		table(socket, io, store);
		loveLetter(socket, io, store);
	});
};