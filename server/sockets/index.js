import { createStore } from 'redux';

import table from './table';

import { login } from '../models/users';

export default function(io, store) {
	io.on('connection', (socket) => {
		console.log('---------- a socket connected ----------');

		socket.on('client.all', () => {
			socket.emit('server.all', store.getState());
		});

		table(socket, io, store);
	});
};