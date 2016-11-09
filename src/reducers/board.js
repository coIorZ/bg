import { BOARD_TABLE } from '../actions';

const initialState = null;

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case BOARD_TABLE:
		return payload;

	default:
		return state;
	}
};