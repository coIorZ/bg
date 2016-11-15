import LoveLetter from './love_letter';

export const GAME_LOVE_LETTER = '1';
export const GAME_COUP = '2';
export const GAME_TNL = '3';
export const GAME_INNOVATION = '4';

export function getCore(gameId) {
	switch(gameId) {
	case GAME_LOVE_LETTER:
		return LoveLetter;

	default:
		throw 'out of game pool';
	}
}