import { FETCH_GAMES } from '../actions';

const initialState = [];

export default function(state = initialState, action) {
	switch(action.type) {
	case FETCH_GAMES:
		return [...state, ...action.payload];
		
	default:
		return state;
	}
};