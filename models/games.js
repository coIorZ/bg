import mongoose, { Schema } from 'mongoose';

const gameSchema = Schema({
	name: {
		type: String,
		required: true
	},
	players: {
		type: String,
		required: true
	},
	length: {
		type: Number
	},
	designer: {
		type: String
	},
	img_url: {
		type: String
	}
});

const Game = mongoose.model('Game', gameSchema);

export default Game;

export function fetchGames(callback, limit) {
	Game.find(callback).limit(limit);
};