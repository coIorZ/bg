import axios from 'axios';

import socket from '../sockets';


// ---------- client ----------
export const SET_CLIENTHEIGHT = 'SET_CLIENTHEIGHT';
export function setClientHeight(payload) {
	return {type: SET_CLIENTHEIGHT, payload};
};

export const SET_CLIENTWIDTH = 'SET_CLIENTWIDTH';
export function setClientWidth(payload) {
	return {type: SET_CLIENTWIDTH, payload};
};

export const SET_GAMEINFO_FOLDED = 'SET_GAMEINFO_FOLDED';
export function setGameInfoFolded(payload) {
	return {type: SET_GAMEINFO_FOLDED, payload};
};

export const SET_LOGIN_VISIBLE = 'SET_LOGIN_VISIBLE';
export function setLoginVisible(payload) {
	return {type: SET_LOGIN_VISIBLE, payload};
};

export const SET_BOARD_VISIBLE = 'SET_BOARD_VISIBLE';
export function setBoardVisible(payload) {
	return {type: SET_BOARD_VISIBLE, payload};
};

export const SET_CARD = 'SET_CARD';
export function setCard(payload) {
	return {type: SET_CARD, payload};
};

export const SET_HEADER_PAGE = 'SET_HEADER_PAGE';
export function setHeaderPage(payload) {
	return {type: SET_HEADER_PAGE, payload};
};

export const NOTIFY = 'NOTIFY';
export function notify(payload) {
	return {type: NOTIFY, payload};
};

export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';
export function dismissNotification(payload) {
	return {type: DISMISS_NOTIFICATION, payload};
};

export const LOGOUT = 'LOGOUT';
export function logout() {
	return {type: LOGOUT};
};

export const LOGIN = 'LOGIN';
export function login(username, password, isRemember) {
	const request = axios.post('api/user/login', {
		username,
		password,
		isRemember
	});
	return (dispatch) => {
		request.then(({ data }) => {
			if(data) {
				dispatch({type: LOGIN, payload: data});
				dispatch({type: SET_LOGIN_VISIBLE, payload: false});
				dispatch({type: SET_GAMEINFO_FOLDED, payload: 2});
				socket.emit('client.user.login', data._id);
				window.localStorage.setItem('username', data.username);
			} else {
				dispatch({type: NOTIFY, payload: {
					message: 'wrong username or password'
				}});
			}
		});
	};
};

export const USER_AUTH = 'USER_AUTH';
export function userAuth() {
	const request = axios.get('api/user/auth');
	return (dispatch) => {
		request.then(({ data }) => {
			dispatch({type: USER_AUTH, payload: data});
			if(data) socket.emit('client.user.login', data._id);
		});
	};
};


// ---------- games ----------
export const FETCH_GAMES = 'FETCH_GAMES';
export function fetchGames(payload) {
	return {type: FETCH_GAMES, payload};
};


// ---------- tables ----------
export const FETCH_TABLES = 'FETCH_TABLES';
export function fetchTables(payload) {
	return {type: FETCH_TABLES, payload};
};

export const NEW_TABLE = 'NEW_TABLE';
export function newTable(payload) {
	return {type: NEW_TABLE, payload};
};

export const JOIN_TABLE = 'JOIN_TABLE';
export function joinTable(payload) {
	return {type: JOIN_TABLE, payload};
};

export const LEAVE_TABLE = 'LEAVE_TABLE';
export function leaveTable(payload) {
	return {type: LEAVE_TABLE, payload};
};

export const REMOVE_TABLE = 'REMOVE_TABLE';
export function removeTable(payload) {
	return {type: REMOVE_TABLE, payload};
};

export const START_TABLE = 'START_TABLE';
export function startTable(payload) {
	return {type: START_TABLE, payload};
};


// ---------- users ----------
export const FETCH_USERS = 'FETCH_USERS';
export function fetchUsers(payload) {
	return {type: FETCH_USERS, payload};
};

export const USER_ONLINE = 'USER_ONLINE';
export function userOnline(payload) {
	return {type: USER_ONLINE, payload};
};

export const USER_OFFLINE = 'USER_OFFLINE';
export function userOffline(payload) {
	return {type: USER_OFFLINE, payload};
};


// ---------- messages ----------
export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export function fetchMessages(payload) {
	return {type: FETCH_MESSAGES, payload};
};

export const NEW_MESSAGE = 'NEW_MESSAGE';
export function newMessage(payload) {
	return {type: NEW_MESSAGE, payload};
};


// ---------- boards ----------
export const UPDATE_BOARD = 'UPDATE_BOARD';
export function updateBoard(payload) {
	return {type: UPDATE_BOARD, payload};
};


// ---------- logs ----------
export const CLEAR_LOGS = 'CLEAR_LOGS';
export function clearLogs(payload) {
	return {type: CLEAR_LOGS, payload};
};

export const UPDATE_LOGS = 'UPDATE_LOGS';
export function updateLogs(payload) {
	return {type: UPDATE_LOGS, payload};
};

