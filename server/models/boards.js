import mongoose, { Schema } from 'mongoose';

const boardSchema = Schema({
	table: {type: Schema.Types.Mixed, required: true},
	data: {type: Schema.Types.Mixed, required: true}
});

const Board = mongoose.model('Board', boardSchema);

export default Board;

export function fetchBoardData(tableId, callback) {
	Board.findOne({'table._id': tableId}, (err, board) => {
		if(board) callback(board.data);
	});
};	
