import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';

const app = Express();
const port = 8000;

app.use(Express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('*', (req, res) => {
	res.render('index');
});

app.listen(port, () => 
	console.log(`app listening on port ${port}`)
);