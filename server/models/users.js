import mongoose, { Schema } from 'mongoose';

const userSchema = Schema({
	name: {type: String, required: true},
	username: {type: String},
	password: {type: String, select: false}
});

const User = mongoose.model('User', userSchema);

export default User;