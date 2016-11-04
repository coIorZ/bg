import { combineReducers } from 'redux';

import client from './client';
import games from './games';
import gamesPage from './games_page';

export default combineReducers({
	client,
	games,
	gamesPage
});