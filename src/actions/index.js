import axios from 'axios';

export const SET_CLIENTHEIGHT = 'SET_CLIENTHEIGHT';
export function setClientHeight(height) {
	return {
		type: SET_CLIENTHEIGHT,
		payload: height
	};
};

export const SET_CLIENTWIDTH = 'SET_CLIENTWIDTH';
export function setClientWidth(width) {
	return {
		type: SET_CLIENTWIDTH,
		payload: width
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

