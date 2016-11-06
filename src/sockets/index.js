import io from 'socket.io-client';

import store from '../store';

const socket = io();

export const NEW_TABLE = 'NEW_TABLE';
socket.on('server.all', (data) => {
	store.dispatch({
		type: NEW_TABLE,
		payload: data.tables
	});
});

export default socket;