import { CLEAR_LOGS, UPDATE_LOGS, FETCH_LOGS } from '../actions';

const initialState = [];

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case CLEAR_LOGS:
		return [];

    case UPDATE_LOGS:
        return [...state, ...payload];

    case FETCH_LOGS:
        return payload;

	default:
		return state;
	}
};