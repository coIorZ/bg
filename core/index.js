import LoveLetter from './love_letter';
import POTO from './phantom_of_the_opera';

export const GAME_LOVE_LETTER = '1';
export const GAME_PHANTOM_OF_THE_OPERA = '2';
export const GAME_The_RESISTANCE_AVALON = '3';
export const GAME_COUP = '4';
export const GAME_BLOODY_INN = '5';
export const GAME_INNOVATION = '6';

export function getCore(gameId) {
	switch(gameId) {
	case GAME_LOVE_LETTER:
		return LoveLetter;

	case GAME_PHANTOM_OF_THE_OPERA:
		return POTO; 

	default:
		throw 'out of game pool';
	}
}