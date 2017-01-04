import _ from 'lodash';

import User from '../models/users';
import { games } from '../../core';

export default function(router, store) {
	router.post('/user/login', (req, res) => {
		User.findOne({
			username: req.body.username.toLowerCase(),
			password: req.body.password
		}, (err, user) => {
			if(err) res.send(err);
			if(user) {
				if(req.body.isRemember) {
					req.session.user = user;
				} else {
					req.session.user = null;
				}
				store.dispatch({type: 'USER_ONLINE', payload: user._id});
				res.io.emit('server.user.online', user._id);
				res.json({ user, message: {
					en: 'logged in successfully',
					ch: '成功登录'
				}});
			} else {
				req.session.user = null;
				res.json({ user, message: {
					en: 'Wrong username or password',
					ch: '错误的用户名或密码'
				}});
			}
		});
	});

	router.post('/user/signup', (req, res) => {
		User.findOne({
			username: req.body.username.toLowerCase()
		}, (err, user) => {
			if(err) res.send(err);
			if(user) {
				req.session.user = null;
				res.json({user: null, message: {
					en: 'Duplicate user name',
					ch: '用户名已存在'
				}});
			} else {
				const user = {
					username: req.body.username.toLowerCase(),
					password: req.body.password,
					name: req.body.name
				};
				User.create(user, (err, user) => {
					if(err) res.send(err);
					delete user.password;
					req.session.user = user;
					store.dispatch({type: 'USER_NEW', payload: user});
					res.io.emit('server.user.new', user);
					res.json({ user, message: {
						en: 'signed up successfully',
						ch: '成功注册'
					}});
				});
			}
		})
	});

	router.get('/user/auth', (req, res) => {
		res.json(req.session.user);
	});

	router.post('/user/logout', (req, res) => {
		req.session.user = null;
		store.dispatch({type: 'USER_OFFLINE', payload: req.body.id});
		res.io.emit('server.user.offline', req.body.id);
		res.json({user: null});
	});

	router.post('/user/unload', (req, res) => {
		store.dispatch({type: 'USER_OFFLINE', payload: req.body.id});
		res.io.emit('server.user.offline', req.body.id);
		res.json({});
	});

	router.get('/games', (req, res) => {
		res.json(games);
	});
	
	return router;
};