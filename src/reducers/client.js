import { SET_CLIENTHEIGHT, SET_CLIENTWIDTH } from '../actions';

const initialState = {
	clientHeight: document.documentElement.clientHeight,
	clientWidth: document.documentElement.clientWidth,
	user: `guest${Date.now()}`
};

export default function(state = initialState, action) {
	switch(action.type) {
	case SET_CLIENTHEIGHT:
		return {...state, clientHeight: action.payload};

	case SET_CLIENTWIDTH:
		return {...state, clientWidth: action.payload};

	default:
		return state;
	}
};