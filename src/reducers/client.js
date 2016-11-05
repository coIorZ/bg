import { SET_CLIENTHEIGHT, SET_CLIENTWIDTH, SET_GAMEINFO_FOLDED, SHOW_LOGIN } from '../actions';

const initialState = {
	clientHeight: document.documentElement.clientHeight,
	clientWidth: document.documentElement.clientWidth,
	gameInfo: {
		folded: 1  // 0-folded  1-half  2-full
	},
	showLogin: false
};

export default function(state = initialState, action) {
	switch(action.type) {
	case SET_CLIENTHEIGHT:
		return {...state, clientHeight: action.payload};

	case SET_CLIENTWIDTH:
		return {...state, clientWidth: action.payload};

	case SET_GAMEINFO_FOLDED:
		return {
			...state,
			gameInfo: {folded: action.payload}
		};

	case SHOW_LOGIN:
		return {...state, showLogin: action.payload};

	default:
		return state;
	}
};