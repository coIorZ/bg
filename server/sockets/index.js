import _ from 'lodash';
import { createStore } from 'redux';

import { fetchLog } from '../models/logs';

import table from './table';
import loveLetter from './love_letter';
import POTO from './phantom_of_the_opera';

export default function(io, store) {
	io.on('connection', (socket) => {
		console.log('---------- a socket connected ----------');

		socket.on('disconnect', () => {

		});


		// ---------- users ----------
		socket.emit('server.user', store.getState().users);

		socket.on('client.user.login', () => {
			socket.emit('server.table', store.getState().tables);
		});

		socket.on('client.user.online', payload => {
			store.dispatch({type: 'USER_ONLINE', payload});
			io.emit('server.user.online', payload);
		});


		// ---------- chatroom ----------
		socket.emit('server.message', store.getState().messages);

		socket.on('client.message.new', ({ user, message }) => {
			const payload = {
				user,
				message,
				date: Date.now()
			};
			store.dispatch({type: 'NEW_MESSAGE', payload});
			io.emit('server.message.new', payload);
		});
		

		// ---------- logs ----------
		socket.on('client.log', tableId => {
			fetchLog(tableId, ({ data }) => {
				socket.emit('server.log', data);
			});
		});

		table(socket, io, store);
		loveLetter(socket, io, store);
		POTO(socket, io, store);
	});
};