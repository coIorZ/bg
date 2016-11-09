import { FETCH_GAMES } from '../actions';

const initialState = null;

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case FETCH_GAMES:
		return payload;
		
	default:
		return state;
	}
};