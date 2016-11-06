import { NEW_TABLE, JOIN_TABLE } from '../sockets';

const initialState = [];

export default function(state = initialState, action) {
	switch(action.type) {
	case NEW_TABLE:
		const table = {
			_id: Date.now(),
			host: action.payload.user,
			players: [action.payload.user],
			gameId: action.payload.gameId
		};
		return [table, ...state];

	case JOIN_TABLE:


	default:
		return state;
	}
};