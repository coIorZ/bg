import mongoose, { Schema } from 'mongoose';

const logSchema = Schema({
    tableId: {type: Schema.Types.ObjectId, required: true},
    data: {type: Schema.Types.Mixed, required: true}
});

const Log = mongoose.model('Log', logSchema);

export default Log;

export function fetchLog(tableId, callback = noop) {
    Log.findOne({ tableId }, (err, log) => {
        if(!err) {
            callback(log);
        }
    });
};  

export function updateLog(log, callback = noop) {
    log.markModified('data');
    log.save((err) => {
        if(!err) {
            callback(log);
        }
    });
};

export function deleteLog(tableId , callback = noop) {
    Log.remove({ tableId }, err => {
        if(!err) {
            callback(tableId);
        }
    });
};

function noop() {}