import _ from 'lodash';

import {
	SET_CLIENTHEIGHT, SET_CLIENTWIDTH, SET_GAMEINFO_FOLDED, SET_LOGIN_VISIBLE, SET_BOARD_VISIBLE, SET_CARD
	, SET_HEADER_PAGE, LOGIN, LOGOUT, USER_AUTH, NOTIFY, DISMISS_NOTIFICATION
} from '../actions';

const notifyType = {
	info: '#337ab7',
	warning: '#f0ad4e',
	error: '#d9534f',
	success: '#5cb85c'
};

const initialState = {
	clientHeight: document.documentElement.clientHeight,
	clientWidth: document.documentElement.clientWidth,
	gameInfo: {
		folded: 1  // 0-folded  1-half  2-full
	},
	card: null,
	page: 'cosmos',
	loginVisible: false,
	boardVisible: false,
	user: null,
	notifications: []
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

	case SET_CARD:
		return {...state, card: payload};

	case SET_HEADER_PAGE:
		return {...state, page: payload};

	case LOGIN:
		return {...state, user: payload};

	case LOGOUT:
		return {...state, user: null};

	case USER_AUTH:
		return {...state, user: payload};

	case NOTIFY:
		return {
			...state,
			notifications: [
				...state.notifications, 
				{
					...payload,
					key: payload.key || Date.now(),
					dismissAfter: payload.dismissAfter || 3000
				}
			]
		};

	case DISMISS_NOTIFICATION:
		return {
			...state,
			notifications: _.filter(state.notifications, n => n.key !== payload)
		};

	default:
		return state;
	}
};