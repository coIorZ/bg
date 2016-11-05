import { combineReducers } from 'redux';

import client from './client';
import games from './games';
import users from './users';

export default combineReducers({
	client,
	games,
	users
});