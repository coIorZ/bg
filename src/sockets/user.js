import _ from 'lodash';

import { userOnline } from '../actions';

export default function(socket, store) {
	socket.on('server.user.online', payload => store.dispatch(userOnline(payload)));
};