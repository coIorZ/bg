import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { createStore } from 'redux';

import routes from './routes';
import reducers from './reducers';
import sockets from './sockets';

import User from './models/users';
import Board from './models/boards';

const app = express();
const router = express.Router();
const port = 8000;
const db_address = 'localhost/cosmos';
const db = mongoose.connection;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const store = createStore(reducers);

mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'jade');

// ---------- middleware ----------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	cookie: {maxAge: 7 * 24 * 60 * 60 * 1000},
	secret: 'bgc',
	resave: true,
	saveUninitialized: true
}));
app.use(morgan('dev'));
app.use((req, res, next) => {
	res.io = io;
	next();
});


// ---------- sockets ----------
sockets(io, store);


// ---------- api ----------
app.use('/api', routes(router, store));


// ---------- init ----------
init();


// ---------- render ----------
app.get('*', (req, res) => {
	res.render('index');
});

db.on('error', (err) => 
	console.log(err)
);
mongoose.connect(`mongodb://${db_address}`);

http.listen(port, () => 
	console.log(`app listening on port ${port}`)
);


function init() {
	User.find((err, users) => {
		if(!err) {
			store.dispatch({type: 'INIT_USERS', payload: users});
		}
	});
	Board.find({'table.status': 1}, (err, boards) => {
		if(!err) {
			store.dispatch({type: 'INIT_TABLES', payload: boards});
		}
	});
}
