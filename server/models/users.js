import mongoose, { Schema } from 'mongoose';

const userSchema = Schema({
	name: {
		type: String,
		required: true
	}
});

const User = mongoose.model('User', userSchema);

export default User;

export function login(condition, callback) {
	User.findOne(condition, callback);
};