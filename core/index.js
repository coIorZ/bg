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
    id : GAME_The_RESISTANCE_AVALON, 
    name : 'The Resistance: Avalon', 
    length : 30, 
    designer : 'Don Eskridge', 
    img_url : './img/avalon/avalon.jpg', 
    rule_url: 'files/avalon.pdf',
    weight : 1.78, 
    min_players : 5, 
    max_players : 10
}, {
    id : GAME_COUP, 
    name : 'Coup', 
    length : 15, 
    designer : 'Rikki Tahta', 
    img_url : './img/coup.jpg', 
    rule_url: 'files/coup.jpg',
    weight : 1.44, 
    min_players : 2, 
    max_players : 6
}, {
    id : '5', 
    name : 'Bloody Inn', 
    length : 45, 
    designer : 'Nicolas Robert', 
    img_url : './img/bloody_inn/bloody_inn.jpg', 
    rule_url: 'files/bloody_inn.pdf',
    weight : 2.36, 
    min_players : 1,
    max_players : 4
}];