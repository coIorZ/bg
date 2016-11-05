import axios from 'axios';

// ---------- client ----------

export const SET_CLIENTHEIGHT = 'SET_CLIENTHEIGHT';
export function setClientHeight(payload) {
	return {
		type: SET_CLIENTHEIGHT,
		payload
	};
};

export const SET_CLIENTWIDTH = 'SET_CLIENTWIDTH';
export function setClientWidth(payload) {
	return {
		type: SET_CLIENTWIDTH,
		payload
	};
};

export const SET_GAMEINFO_FOLDED = 'SET_GAMEINFO_FOLDED';
export function setGameInfoFolded(payload) {
	return {
		type: SET_GAMEINFO_FOLDED,
		payload
	};
};

export const SHOW_LOGIN = 'SHOW_LOGIN';
export function showLogin(payload) {
	return {
		type: SHOW_LOGIN,
		payload
	};
};

// ---------- games ----------

export const FETCH_GAMES = 'FETCH_GAMES';
export function fetchGames() {
	const request = axios.get('api/game');
	return (dispatch) => {
		request.then((data) => {
			dispatch({
				type: FETCH_GAMES,
				payload: data
			});
		});
	};
};

// ---------- users ----------

export const LOGIN = 'LOGIN';
export function login(username, password) {
	const request = axios.post('api/user/login', {
		username,
		password
	});
	return (dispatch) => {
		request.then((data) => {
			dispatch({
				type: LOGIN,
				payload: data
			});
		});
	};
};

