import io from 'socket.io-client';
import _ from 'lodash';

import store from '../store';

import { SERVER_ALL_TABLES } from './type';
import { setBoardVisible } from '../actions';

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
bindSocket('server.table.start');

socket.on('server.board.show', (table) => {
	if(_.some(table.players, player => player._id === store.getState().client.user._id))
		store.dispatch(setBoardVisible(true));
});

export default socket;

function bindSocket(event) {
	socket.on(event, (action) => {
		store.dispatch(action);
	});
}