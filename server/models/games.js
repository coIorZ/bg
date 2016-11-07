import mongoose, { Schema } from 'mongoose';

const gameSchema = Schema({
	name: {type: String, required: true},
	min_players: {type: Number, required: true},
	max_players: {type: Number, required: true},
	length: {type: Number, required: true},
	designer: {type: String},
	img_url: {type: String}
});

const Game = mongoose.model('Game', gameSchema);

export default Game;

export function fetchGames(callback) {
	Game.find(callback);
};