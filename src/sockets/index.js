import io from 'socket.io-client';

import store from '../store';

import { SERVER_ALL_TABLES } from './type';

const socket = io();

socket.on('server.all', (data) => {
	store.dispatch({
		type: SERVER_ALL_TABLES,
		payload: data.tables
	});
});

bindSocket('server.table.new');
bindSocket('server.table.join');
bindSocket('server.table.leave');
bindSocket('server.table.remove');

export default socket;

function bindSocket(event) {
	socket.on(event, (action) => {
		store.dispatch(action);
	});
}