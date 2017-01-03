import LoveLetter from './love_letter';
import POTO from './phantom_of_the_opera';

export const GAME_LOVE_LETTER = '1';
export const GAME_PHANTOM_OF_THE_OPERA = '2';
export const GAME_CHAMPIONS_OF_MIDGARD = '3';
export const GAME_BLOODY_INN = '4';
export const GAME_INNOVATION = '5';

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

export const games = [{
    id : GAME_LOVE_LETTER, 
    name : 'Love Letter', 
    length : 20, 
    designer : 'Seiji Kanai', 
    img_url : './img/love_letter/love_letter.jpg', 
    bg_url: './img/love_letter/bg_1.jpg',
    rule_url: 'files/love_letter.pdf',
    weight : 1.21, 
    min_players : 2, 
    max_players : 4
}, {
    id : GAME_PHANTOM_OF_THE_OPERA, 
    name : "Le Fantôme de l'Opéra", 
    length : 30, 
    designer : 'Bruno Cathala', 
    img_url : './img/phantom_of_the_opera/phantom_of_the_opera.jpg', 
    rule_url: 'files/phantom_of_the_opera.pdf',
    weight : 2.19, 
    min_players : 2, 
    max_players : 2
}, {
    id : GAME_CHAMPIONS_OF_MIDGARD, 
    name : 'Champions of Midgard', 
    length : 75, 
    designer : 'Ole Steiness', 
    img_url : './img/champions_of_the_midgard/champions_of_the_midgard.jpg', 
    rule_url: 'files/champions_of_the_midgard.pdf',
    weight : 2.54, 
    min_players : 2,
    max_players : 4
}, {
    id : GAME_BLOODY_INN, 
    name : 'Bloody Inn', 
    length : 45, 
    designer : 'Nicolas Robert', 
    img_url : './img/bloody_inn/bloody_inn.jpg', 
    rule_url: 'files/bloody_inn.pdf',
    weight : 2.36, 
    min_players : 1,
    max_players : 4
}];