import User from '../models/users';

export default function(router) {
	router.post('/user/login', (req, res) => {
		User.findOne({
			username: req.body.username,
			password: req.body.password
		}, (err, user) => {
			if(err) res.send(err);
			if(req.body.isRemember) {
				req.session.user = user;
			} else {
				req.session.user = null;
			}
			res.json(user);
		});
	});

	router.get('/user/auth', (req, res) => {
		res.json(req.session.user);
	});
	
	return router;
};