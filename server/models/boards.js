import mongoose, { Schema } from 'mongoose';

const boardSchema = Schema({
	tableId: {type: String, required: true},
	players: {type: Object, required: true}

});

const Board = mongoose.model('Boards', boardSchema);

export default Board;