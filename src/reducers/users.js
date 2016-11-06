import { LOGIN } from '../actions';

const initialState = {
	me: null
};

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case LOGIN:
		return {...state, me: payload};

	default:
		return state;
	}
};