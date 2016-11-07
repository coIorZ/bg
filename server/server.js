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

const app = express();
const router = express.Router();
const port = 8000;
const db_address = 'localhost/cosmos';
const db = mongoose.connection;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const store = createStore(reducers);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'jade');

// ---------- middleware ----------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	cookie: {maxAge: 60 * 60 * 1000},
	secret: 'bgc',
	resave: true,
	saveUninitialized: true
}));
app.use(morgan('dev'));


// ---------- sockets ----------
sockets(io, store);


// ---------- api ----------
app.use('/api', routes(router));


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
