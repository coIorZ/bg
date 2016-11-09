import mongoose, { Schema } from 'mongoose';

const boardSchema = Schema({
	table: {type: Schema.Types.Mixed, required: true},
	data: {type: Schema.Types.Mixed, required: true}
});

const Board = mongoose.model('Board', boardSchema);

export default Board;
