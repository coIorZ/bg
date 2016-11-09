import { LOGIN, FETCH_USERS } from '../actions';

const initialState = {
	me: null
};

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case LOGIN:
		return {...state, me: payload};

	case FETCH_USERS:
		return payload;

	default:
		return state;
	}
};