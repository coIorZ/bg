import {
	SET_CLIENTHEIGHT, SET_CLIENTWIDTH, SET_GAMEINFO_FOLDED, SET_LOGIN_VISIBLE, SET_BOARD_VISIBLE
	, LOGIN, USER_AUTH
} from '../actions';

const initialState = {
	clientHeight: document.documentElement.clientHeight,
	clientWidth: document.documentElement.clientWidth,
	gameInfo: {
		folded: 1  // 0-folded  1-half  2-full
	},
	loginVisible: false,
	boardVisible: false,
	user: null
};

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case SET_CLIENTHEIGHT:
		return {...state, clientHeight: payload};

	case SET_CLIENTWIDTH:
		return {...state, clientWidth: payload};

	case SET_GAMEINFO_FOLDED:
		return {
			...state,
			gameInfo: {folded: payload}
		};

	case SET_LOGIN_VISIBLE:
		return {...state, loginVisible: payload};

	case SET_BOARD_VISIBLE:
		return {...state, boardVisible: payload};

	case LOGIN:
		return {...state, user: payload};

	case USER_AUTH:
		return {...state, user: payload};

	default:
		return state;
	}
};