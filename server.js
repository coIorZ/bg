import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

import routes from './routes';

const app = express();
const router = express.Router();
const port = 8000;
const db_address = 'localhost/cosmos';
const db = mongoose.connection;
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use((req, res, next) => {
	res.io = io;
	next();
});

app.use('/api', routes(router));

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
