var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public');
app.set('view engine', 'jade');

app.get('/*', function(req, res) {
	res.render('index');
});

app.listen(8000, function() {
	console.log('app listening on port 8000');
});