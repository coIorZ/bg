import _ from 'lodash';
import { createStore } from 'redux';

import table from './table';
import loveLetter from './love_letter';
import POTO from './phantom_of_the_opera';
// import avalon from './avalon';

export default function(io, store) {
	io.on('connection', (socket) => {
		console.log('---------- a socket connected ----------');

		socket.emit('server.user', store.getState().users);
		socket.emit('server.message', store.getState().messages);

		socket.on('client.user.login', payload => {
			socket.emit('server.table', store.getState().tables);
		});

		socket.on('client.user.online', payload => {
			store.dispatch({type: 'USER_ONLINE', payload});
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

		});

		table(socket, io, store);
		loveLetter(socket, io, store);
		POTO(socket, io, store);
		// avalon(socket, io, store);
	});
};