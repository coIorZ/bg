import _ from 'lodash';

import { FETCH_USERS, USER_ONLINE, USER_OFFLINE } from '../actions';

const initialState = {};

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case FETCH_USERS:
		return payload;

	case USER_ONLINE:
		return {
			...state,
			[payload]: {
				...state[payload],
				online: true
			}
		};

	case USER_OFFLINE:
		return {
			...state,
			[payload]: {
				...state[payload],
				online: false
			}
		};

	default:
		return state;
	}
};