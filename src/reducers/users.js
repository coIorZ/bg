import { LOGIN, FETCH_USERS, USER_ONLINE } from '../actions';

const initialState = {
	me: null
};

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case LOGIN:
		return {...state, me: payload};

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

	default:
		return state;
	}
};