import io from 'socket.io-client';

import store from '../store';

import table from './table';
// import user from './user';
import loveLetter from './love_letter';

import { fetchTables, fetchUsers, fetchGames } from '../actions';

const socket = io();

socket.on('server.game', payload => {
	store.dispatch(fetchGames(payload));
});

socket.on('server.user.login', data => {
	store.dispatch(fetchUsers(data.users));
	store.dispatch(fetchTables(data.tables));
});

table(socket, store);
// user(socket, store);
loveLetter(socket, store);

export default socket;