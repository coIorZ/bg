import { FETCH_GAMES } from '../actions';

const initialState = [];

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case FETCH_GAMES:
		return [...state, ...payload];
		
	default:
		return state;
	}
};