import io from 'socket.io-client';

import store from '../store';

import table from './table';
import user from './user';
import loveLetter from './love_letter';
import poto from './phantom_of_the_opera';

import { fetchGames, fetchMessages, newMessage, notify, dismissNotification } from '../actions';

const socket = io();

socket.on('connect', () => {
	const tableId = store.getState().client.tableId;
	if(tableId) {
		socket.emit('client.table.board', tableId);
	}
	store.dispatch(notify({
		message: 'Connected to server'
	}));
});

socket.on('reconnecting', () => {
	store.dispatch(notify({
		message: 'Disconnected from server. Trying to reconnect'
	}));
});

socket.on('server.message', payload => {
	store.dispatch(fetchMessages(payload));
});

socket.on('server.message.new', payload => {
	store.dispatch(newMessage(payload));
});

user(socket, store);
table(socket, store);
loveLetter(socket, store);
poto(socket, store);

export default socket;