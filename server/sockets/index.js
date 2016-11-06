import { createStore } from 'redux';

import { login } from '../models/users';

export const NEW_TABLE = 'NEW_TABLE';
export const JOIN_TABLE = 'JOIN_TABLE';

export default function(io, store) {
	io.on('connection', (socket) => {
		socket.emit('server.all', store.getState());

		// ---------- table ----------
		socket.on('client.table.new', (payload) => {
			store.dispatch({
				type: NEW_TABLE,
				payload
			});
		});

		socket.on('client.table.join', (payload) => {
			store.dispatch({
				type: JOIN_TABLE,
				payload
			});
		});


		// ---------- user ----------
		socket.on('client.user.login', (data) => {
			login(data, (err, user) => {
				socket.emit('server.user.login', user);
			});
		});
	});

	store.subscribe(() => {
		io.emit('server.all', store.getState());
	});
};