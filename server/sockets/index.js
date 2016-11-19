import _ from 'lodash';
import { createStore } from 'redux';

import table from './table';
import loveLetter from './love_letter';
import avalon from './avalon';

export default function(io, store) {
	// io.clients = [];

	io.on('connection', (socket) => {
		console.log('---------- a socket connected ----------');

		socket.emit('server.game', store.getState().games);
		socket.emit('server.user', store.getState().users);
		socket.emit('server.message', store.getState().messages);

		socket.on('client.user.login', payload => {
			// socket.user = payload;
			// io.clients.push(socket);
			// console.log(io.clients);
			// store.dispatch({type: 'USER_ONLINE', payload});
			socket.emit('server.table', store.getState().tables);
			// io.emit('server.user.online', payload);
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
			// const index = io.clients.indexOf(socket);
			// console.log(index);
			// if(index < 0) return;
			// const client = io.clients.splice(index, 1)[0];
			// store.dispatch({type: 'USER_OFFLINE', payload: client.user});
			// io.emit('server.user.offline', client.user);
		});

		table(socket, io, store);
		loveLetter(socket, io, store);
		avalon(socket, io, store);
	});
};