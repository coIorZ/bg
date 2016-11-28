import _ from 'lodash';

import User from '../models/users';
import games from '../games';

let users = [];

export default function(router, store) {
	router.post('/user/login', (req, res) => {
		User.findOne({
			username: req.body.username,
			password: req.body.password
		}, (err, user) => {
			if(err) res.send(err);
			if(user) {
				const index = users.indexOf(user._id.toString());
				if(index >= 0) {
					req.session.user = null;
					res.json({ user: null, message: 'This account is alreay logged in' });
				} else {
					if(req.body.isRemember) {
						req.session.user = user;
					} else {
						req.session.user = null;
					}
					users.push(user._id.toString());
					store.dispatch({type: 'USER_ONLINE', payload: user._id});
					res.io.emit('server.user.online', user._id);
					res.json({ user });
				}
			} else {
				req.session.user = null;
				res.json({ user, message: 'Wrong username or password' });
			}
		});
	});

	router.get('/user/auth', (req, res) => {
		res.json(req.session.user);
	});

	router.post('/user/logout', (req, res) => {
		const index = users.indexOf(req.body.id);
		if(index >= 0) {
			const userId = users.splice(index, 1)[0];
			store.dispatch({type: 'USER_OFFLINE', payload: userId});
			res.io.emit('server.user.offline', userId);
		}
	});

	router.get('/games', (req, res) => {
		res.json(games);
	});
	
	return router;
};