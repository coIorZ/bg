import axios from 'axios';

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
}

