import { combineReducers } from 'redux';

import appearance from './appearance';
import games from './games';
import gamesPage from './games_page';

export default combineReducers({
	appearance,
	games,
	gamesPage
});