import mongoose, { Schema } from 'mongoose';
import _ from 'lodash';

const userSchema = Schema({
	name: {type: String, required: true},
	username: {type: String, select: false},
	password: {type: String, select: false}
});

const User = mongoose.model('User', userSchema);

export default User;

export function login(query, callback) {
	User.findOne(query, callback);
};