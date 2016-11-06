import { NEW_TABLE } from '../sockets';

const initialState = [];

export default function(state = initialState, action) {
	switch(action.type) {
	case NEW_TABLE:
		return action.payload;

	default:
		return state;
	}
};