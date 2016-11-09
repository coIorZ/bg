import _ from 'lodash';

const initialState = null;

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case 'INIT_GAMES':
		return payload;

	default:
		return state;
	}
};