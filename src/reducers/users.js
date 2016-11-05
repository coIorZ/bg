import { LOGIN } from '../actions';

const initialState = {
	me: null
};

export default function(state = initialState, action) {
	switch(action.type) {
	case LOGIN:
		return {...state, me: action.payload.data};

	default:
		return state;
	}
};