import io from 'socket.io-client';

import store from '../store';

import { 
	notify,
	fetchMessages, newMessage,
	fetchUsers, userOnline, userOffline,
	fetchTables, newTable, joinTable, leaveTable, removeTable, startTable, 
	updateBoard, clearLogs, fetchLogs, updateLogs, setTable, setResponse
} from '../actions';

const socket = io();

// ---------- connection ----------
socket.on('connect', () => {
	const table = store.getState().client.table;
	const user = store.getState().client.user;
	if(table) {
		socket.emit('client.table.board', table._id);
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


// ---------- chatroom ----------
socket.on('server.message', payload => {
	store.dispatch(fetchMessages(payload));
});

socket.on('server.message.new', payload => {
	store.dispatch(newMessage(payload));
});


// ---------- users ----------
socket.on('server.user', payload => {
	store.dispatch(fetchUsers(payload));
});

socket.on('server.user.online', payload => {
	store.dispatch(userOnline(payload));
});

socket.on('server.user.offline', payload => {
	store.dispatch(userOffline(payload));
});

socket.on('server.user.duplication', () => {
	store.dispatch(notify({
		message: {
			en: 'This account is alreay logged in',
			ch: '该账户已登陆'
		}
	}));
});


// ---------- tables ----------
socket.on('server.table', payload => store.dispatch(fetchTables(payload)));

socket.on('server.table.new', payload => store.dispatch(newTable(payload)));

socket.on('server.table.join', payload => store.dispatch(joinTable(payload)));

socket.on('server.table.leave', payload => store.dispatch(leaveTable(payload)));

socket.on('server.table.remove', payload => store.dispatch(removeTable(payload)));

socket.on('server.table.start', payload => {
	store.dispatch(startTable(payload));
	if(_.includes(payload.players, store.getState().client.user._id)) {
		socket.emit('client.board.init', payload._id);
	}
});

socket.on('server.board.init', payload => {
	if(payload) {
		store.dispatch(clearLogs());
		store.dispatch(updateBoard(payload));
		store.dispatch(updateLogs(payload.data.logs));
		store.dispatch(setTable(payload.table));
		store.dispatch(setResponse(true));
	}
});

socket.on('server.board.reconnect', payload => {
	if(payload) {
		store.dispatch(clearLogs());
		store.dispatch(updateBoard(payload));
		store.dispatch(setTable(payload.table));
		store.dispatch(setResponse(true));
		socket.emit('client.log', payload.table._id);
	}
});


// ---------- logs ----------
socket.on('server.log', payload => {
	store.dispatch(fetchLogs(payload));
});


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
		store.dispatch(updateLogs(payload.data.logs));
		store.dispatch(setResponse(true));
	});
};