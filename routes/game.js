import express from 'express';

import { fetchGames } from '../models/games';

export default function(router) {
	router.get('/game', (req, res) => {
		fetchGames((err, games) => {
			if(err) res.send(err);
			res.json(games);
		});
	});
};
