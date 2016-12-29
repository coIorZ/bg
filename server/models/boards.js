import mongoose, { Schema } from 'mongoose';

const boardSchema = Schema({
	table: {type: Schema.Types.Mixed, required: true},
	data: {type: Schema.Types.Mixed, required: true}
});

const Board = mongoose.model('Board', boardSchema);

export default Board;

export function fetchBoard(tableId, callback = noop) {
	Board.findOne({'table._id': tableId}, (err, board) => {
		if(!err) {
			callback(board);
		}
	});
};	

export function updateBoard(board, callback = noop) {
	board.markModified('data');
	board.save((err) => {
		if(!err) {
			callback(board);
		}
	});
};

export function deleteBoard(tableId , callback = noop) {
	Board.remove({'table._id': tableId}, err => {
		if(!err) {
			callback(tableId);
		}
	});
};

function noop() {}