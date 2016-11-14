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

export const LOGIN = 'LOGIN';
export function login(username, password) {
	const request = axios.post('api/user/login', {
		username,
		password
	});
	return (dispatch) => {
		request.then(({ data }) => {
			dispatch({type: LOGIN, payload: data});
			dispatch({type: SET_LOGIN_VISIBLE, payload: false});
			if(data) socket.emit('client.user.login', data._id);
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
	// const request = axios.get('api/game/games');
	// return (dispatch) => {
	// 	request.then(({ data }) => {
	// 		dispatch({type: FETCH_GAMES, payload: data});
	// 	});
	// };
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

