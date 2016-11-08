import { combineReducers } from 'redux';

import tables from './tables';
import users from './users';

export default combineReducers({
	tables,
	users
});