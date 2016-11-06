import io from 'socket.io-client';

import table from './table';

import store from '../store';

const socket = io();

socket.on('server.all', (data) => {
	// store.dispatch({
	// 	type: NEW_TABLE,
	// 	payload: data.tables
	// });
});

table(socket, store);

export default socket;