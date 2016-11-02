import { combineReducers } from 'redux';

import appearance from './appearance';
import games from './games';

export default combineReducers({
	appearance,
	games
});