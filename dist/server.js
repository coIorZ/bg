import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

import router from './router';

const app = express();
const port = 8000;
const db_address = 'localhost/cosmos';
const db = mongoose.connection;

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(dbErrorHandler);

app.use('/api', router);

app.get('*', (req, res) => {
	res.render('index');
});

db.on('error', (err) => 
	console.log(err)
);
mongoose.connect(`mongodb://${db_address}`);

app.listen(port, () => 
	console.log(`app listening on port ${port}`)
);

function dbErrorHandler(err, req, res, next) {
	if(1 !== db.readyState) {
		res.status(503).send('db connection failed');
	} else {
		next();
	}
}