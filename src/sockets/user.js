import _ from 'lodash';

import { fetchUsers, userOnline, userOffline } from '../actions';

export default function(socket, store) {
	socket.on('server.user', payload => {
		store.dispatch(fetchUsers(payload));
	});
	
	socket.on('server.user.online', payload => {
		store.dispatch(userOnline(payload));
	});

	socket.on('server.user.offline', payload => {
		store.dispatch(userOffline(payload));
	});
};