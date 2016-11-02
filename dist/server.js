import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { fetchGames } from './models/games';

const app = Express();
const port = 8000;
const db_address = 'localhost/cosmos';
const db = mongoose.connection;

app.use(Express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(dbErrorHandler);

app.get('/api/games', (req, res) => {
	fetchGames((err, games) => {
		if(err) throw err;
		res.json(games);
	});
});

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