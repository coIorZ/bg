import mongoose, { Schema } from 'mongoose';

const tableSchema = Schema({
	
});

const Table = mongoose.model('Tables', tableSchema);

export default Table;