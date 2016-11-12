import LoveLetter from './love_letter';

export const GAME_LOVE_LETTER = '5820763c7a83ba1a7163211c';
export const GAME_COUP = '5818a2c4bd446a1757fd792e';
export const GAME_TNL = '5818a383bd446a1757fd792f';
export const GAME_INNOVATION = '581ae4ce7a83ba1a71632118';

export function getCore(gameId) {
	switch(gameId) {
	case GAME_LOVE_LETTER:
		return LoveLetter;

	default:
		throw 'out of game pool';
	}
}