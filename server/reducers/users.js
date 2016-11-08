import _ from 'lodash';

import { fetchUsers } from '../models/users';

const initialState = {};

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case 'INIT_USERS':
		const users = {};
		_.each(payload, ({ _id, name }) => {
			users[_id] = {
				_id,
				name,
				online: false
			};
		});
		return users;

	case 'USER_ONLINE':
		return {
			...state,
			[payload]: {
				...state[payload],
				online: true
			}
		};

	default:
		return state;
	}
};