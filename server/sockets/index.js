import { createStore } from 'redux';

import table from './table';

import { login } from '../models/users';

export default function(io, store) {
	io.on('connection', (socket) => {
		socket.emit('server.all', store.getState());
		table(socket, io, store);
		
		// // ---------- user ----------
		// socket.on('client.user.login', (data) => {
		// 	login(data, (err, user) => {
		// 		socket.emit('server.user.login', user);
		// 	});
		// });
	});
};