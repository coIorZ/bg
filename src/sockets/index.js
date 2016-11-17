import io from 'socket.io-client';

import store from '../store';

import table from './table';
import loveLetter from './love_letter';

import { fetchTables, fetchUsers, fetchGames } from '../actions';

const socket = io();

socket.on('server.game', payload => {
	store.dispatch(fetchGames(payload));
});

socket.on('server.user', payload => {
	store.dispatch(fetchUsers(payload));
});

socket.on('server.table', payload => {
	store.dispatch(fetchTables(payload));
});

table(socket, store);
loveLetter(socket, store);

export default socket;