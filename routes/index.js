import game from './game';
import user from './user';

export default function(router) {
	game(router);
	user(router);
	return router;
};