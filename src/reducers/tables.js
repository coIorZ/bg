import _ from 'lodash';

import { NEW_TABLE, JOIN_TABLE, SERVER_ALL_TABLES, LEAVE_TABLE, REMOVE_TABLE, START_TABLE } from '../sockets/type';

const initialState = {};

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case SERVER_ALL_TABLES:
		return payload;

	case NEW_TABLE:
		return {...state, [payload._id]: payload};

	case JOIN_TABLE:
		return {
			...state,
			[payload.tableId]: {
				...state[payload.tableId],
				players: {
					...state[payload.tableId].players,
					[payload.user._id]: payload.user
				}
			}
		};

	case LEAVE_TABLE:
		const id = payload.tableId;
		return {
			...state,
			[id]: {
				...state[id],
				host: state[id].host._id === payload.userId ? 
						{...state[id].players[Object.keys(state[id].players)[1]]} : state[id].host,
				players: {..._.omit(state[id].players, payload.userId)}
			}
		};

	case REMOVE_TABLE:
		return {..._.omit(state, payload)};

	case START_TABLE:
		return {
			...state,
			[payload]: {
				...state[payload],
				started: true
			}
		};

	default:
		return state;
	}
};