import io from 'socket.io-client';

import store from '../store';

import table from './table';
import user from './user';

import { fetchTables, fetchUsers } from '../actions';

const socket = io();

socket.on('server.user.login', data => {
	store.dispatch(fetchTables(data.tables));
	store.dispatch(fetchUsers(data.users));
});

table(socket, store);
user(socket, store);

export default socket;