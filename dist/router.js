import express from 'express';

import { fetchGames } from './models/games';

const router = express.Router();

// game list
router.get('/games', (req, res) => {
	fetchGames((err, games) => {
		if(err) res.send(err);
		res.json(games);
	});
});

export default router;