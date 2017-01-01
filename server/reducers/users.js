import _ from 'lodash';

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

	case 'USER_OFFLINE':
		return {
			...state,
			[payload]: {
				...state[payload],
				online: false
			}
		};

	case 'USER_NEW':
		return {
			...state,
			[payload._id]: {
				_id: payload._id,
				name: payload.name,
				online: true
			}
		};

	default:
		return state;
	}
};