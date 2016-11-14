import { UPDATE_BOARD } from '../actions';

const initialState = null;

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case UPDATE_BOARD:
		return payload;

	default:
		return state;
	}
};