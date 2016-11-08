import { combineReducers } from 'redux';

import client from './client';
import games from './games';
import users from './users';
import tables from './tables';
import board from './board';

export default combineReducers({
	client,
	games,
	users,
	tables,
	board
});