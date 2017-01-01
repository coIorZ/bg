import _ from 'lodash';

import {
	SET_CLIENTHEIGHT, SET_CLIENTWIDTH, SET_GAMEINFO_FOLDED, SET_GAMEINFO_GAME, SET_LOGIN_VISIBLE, SET_CARD
	, SET_HEADER_PAGE, SET_TABLE, SET_RESPONSE, SET_LANGUAGE, SET_USER, NOTIFY, DISMISS_NOTIFICATION
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
		folded: 1,  // 0-folded  1-half  2-full
		game: {}
	},
	table: null,
	cardView: null,
	page: 'cosmos',
	loginVisible: false,
	user: null,
	notifications: [],
	response: true,
	language: window.localStorage.getItem('language') || 'ch'
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
			gameInfo: {
				...state.gameInfo,
				folded: payload
			}
		};

	case SET_GAMEINFO_GAME:
		return {
			...state,
			gameInfo: {
				...state.gameInfo,
				game: payload
			}
		};

	case SET_TABLE:
		return {
			...state,
			table: payload
		};

	case SET_LOGIN_VISIBLE:
		return {...state, loginVisible: payload};

	case SET_CARD:
		return {...state, cardView: payload};

	case SET_HEADER_PAGE:
		return {...state, page: payload};

	case SET_RESPONSE:
		return {...state, response: payload};

	case SET_LANGUAGE:
		return {...state, language: payload};

	case SET_USER:
		return {...state, user: payload};

	case NOTIFY:
		return {
			...state,
			notifications: [
				...state.notifications, 
				{
					...payload,
					message: payload.message[state.language],
					key: payload.key || Date.now(),
					activeBarStyle: {zIndex: 1000},
					barStyle: {zIndex: 1000},
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