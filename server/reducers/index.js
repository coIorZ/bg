import { combineReducers } from 'redux';

import tables from './tables';
import users from './users';
import messages from './messages';

export default combineReducers({
	tables,
	users,
	messages
});