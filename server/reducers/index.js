import { combineReducers } from 'redux';

import tables from './tables';
import users from './users';
import games from './games';

export default combineReducers({
	tables,
	users,
	games
});