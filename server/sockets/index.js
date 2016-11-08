import { createStore } from 'redux';

import table from './table';
import board from './board';

export default function(io, store) {
	io.on('connection', (socket) => {
		console.log('---------- a socket connected ----------');

		socket.on('client.user.login', payload => {
			store.dispatch({type: 'USER_ONLINE', payload});
			io.emit('server.user.online', payload);
			socket.emit('server.user.login', store.getState());
		});

		table(socket, io, store);
		board(socket, io, store);
	});
};