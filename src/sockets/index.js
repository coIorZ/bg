import io from 'socket.io-client';

import store from '../store';

import table from './table';
import user from './user';

import { fetchMessages, newMessage, notify, setResponse, updateBoard, updateLogs } from '../actions';

const socket = io();

socket.on('connect', () => {
	const tableId = store.getState().client.tableId;
	const user = store.getState().client.user;
	if(tableId) {
		socket.emit('client.table.board', tableId);
	}
	if(user) {
		socket.emit('client.user.online', user._id);
	}
	store.dispatch(notify({
		message: {
			en: 'Connected to server',
			ch: '已连接'
		}
	}));
});

socket.on('disconnect', () => {
	store.dispatch(notify({
		message: {
			en: 'Disconnected from server',
			ch: '断开连接'
		}
	}));
});

socket.on('reconnecting', () => {
	store.dispatch(notify({
		message: {
			en: 'Trying to reconnect...',
			ch: '尝试重连中...'
		}
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

// ---------- love letter ----------
register('server.loveletter.play.card');
register('server.loveletter.choose.player');
register('server.loveletter.effect');
register('server.loveletter.round');
register('server.loveletter.game');

// ---------- phantom of the opera ----------
register('server.poto.play.card');
register('server.poto.choose.action');
register('server.poto.game');

export default socket;

export function send(event, payload) {
	if(store.getState().client.response) {
		store.dispatch(setResponse(false));
		socket.emit(event, payload);
	}
};

function register(event) {
	socket.on(event, payload => {
		store.dispatch(updateBoard(payload));
		store.dispatch(updateLogs(payload));
		store.dispatch(setResponse(true));
	});
};