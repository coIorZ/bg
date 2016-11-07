import { fetchGames } from '../models/games';

export default function(router) {
	router.get('/game/games', (req, res) => {
		fetchGames((err, games) => {
			if(err) res.send(err);
			res.json(games);
		});
	});
};
