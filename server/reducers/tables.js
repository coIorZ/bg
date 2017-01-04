import _ from 'lodash';

import { NEW_TABLE, JOIN_TABLE, LEAVE_TABLE, REMOVE_TABLE, START_TABLE } from '../sockets/table';

const initialState = {};

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case 'INIT_TABLES':
		let tables = {};
		_.each(payload, board => {
			tables[board.table._id] = board.table;
		});
		return tables;

	case NEW_TABLE:
		return {[payload._id]: payload, ...state};

	case JOIN_TABLE:
		return {
			...state,
			[payload.tableId]: {
				...state[payload.tableId],
				players: [
					...state[payload.tableId].players,
					payload.userId
				]
			}
		};

	case LEAVE_TABLE:
		const id = payload.tableId;
		return {
			...state,
			[id]: {
				...state[id],
				host: state[id].host === payload.userId ? 
						state[id].players[1] : state[id].host,
				players: _.without(state[id].players, payload.userId)
			}
		};

	case REMOVE_TABLE:
		return {..._.omit(state, payload)};

	case START_TABLE:
		return {
			...state,
			[payload._id]: {
				...state[payload._id],
				status: 1
			}
		};

	default:
		return state;
	}
};