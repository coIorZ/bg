import { FETCH_USERS } from '../actions';

const initialState = {};

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case FETCH_USERS:
		return payload;

	default:
		return state;
	}
};