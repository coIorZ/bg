import _ from 'lodash';
import { createStore } from 'redux';

import table from './table';
import loveLetter from './love_letter';

const clients = [];

export default function(io, store) {
	io.on('connection', (socket) => {
		console.log('---------- a socket connected ----------');

		socket.emit('server.game', store.getState().games);
		socket.emit('server.user', store.getState().users);
		socket.emit('server.message', store.getState().messages);

		socket.on('client.user.login', payload => {
			socket.user = payload;
			clients.push(socket);
			store.dispatch({type: 'USER_ONLINE', payload});
			socket.emit('server.table', store.getState().tables);
			io.emit('server.user.online', payload);
		});

		socket.on('client.message.new', payload => {
			const message = {
				user: payload.user,
				message: payload.message,
				date: Date.now()
			};
			store.dispatch({type: 'NEW_MESSAGE', payload: message});
			io.emit('server.message.new', message);
		});

		socket.on('disconnect', () => {
			const index = clients.indexOf(socket);
			if(index < 0) return;
			const client = clients.splice(index, 1)[0];
			store.dispatch({type: 'USER_OFFLINE', payload: client.user});
			io.emit('server.user.offline', client.user);
		});

		table(socket, io, store);
		loveLetter(socket, io, store);
	});
};