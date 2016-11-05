import { login } from '../models/users';

export default function(router) {
	router.post('/user/login', (req, res) => {
		login({
			username: req.body.username,
			password: req.body.password
		}, (err, user) => {
			if(err) res.send(err);
			res.json(user);
		});
	});
};