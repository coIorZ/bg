import { FETCH_MESSAGES, NEW_MESSAGE } from '../actions';

const initialState = [];

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case FETCH_MESSAGES:
		return payload;

	case NEW_MESSAGE:
		return [...state, payload];

	default:
		return state;
	}
};