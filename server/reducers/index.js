import { combineReducers } from 'redux';

import tables from './tables';
import users from './users';
import games from './games';
import messages from './messages';

export default combineReducers({
	tables,
	users,
	games,
	messages
});