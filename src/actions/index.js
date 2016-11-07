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
			if(data) socket.emit('client.all');
		});
	};
};

export const USER_AUTH = 'USER_AUTH';
export function userAuth() {
	const request = axios.get('api/user/auth');
	return (dispatch) => {
		request.then(({ data }) => {
			dispatch({type: USER_AUTH, payload: data});
			if(data) socket.emit('client.all');
		});
	};
};

// ---------- games ----------

export const FETCH_GAMES = 'FETCH_GAMES';
export function fetchGames() {
	const request = axios.get('api/game');
	return (dispatch) => {
		request.then(({ data }) => {
			dispatch({type: FETCH_GAMES, payload: data});
		});
	};
};

// ---------- users ----------



