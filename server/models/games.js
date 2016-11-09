import mongoose, { Schema } from 'mongoose';

const gameSchema = Schema({
	name: {type: String, required: true},
	min_players: {type: Number, required: true},
	max_players: {type: Number, required: true},
	length: {type: Number},
	designer: {type: String},
	weight: {type: Number},
	img_url: {type: String}
});

const Game = mongoose.model('Game', gameSchema);

export default Game;