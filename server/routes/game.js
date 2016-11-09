import Game from '../models/games';

export default function(router) {
	router.get('/game/games', (req, res) => {
		Game.find((err, games) => {
			if(err) res.send(err);
			res.json(games);
		});
	});
};
