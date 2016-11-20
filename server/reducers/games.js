const initialState = [{
	id : '1', 
	name : 'Love Letter', 
	length : 20, 
	designer : 'Seiji Kanai', 
	img_url : './img/love_letter/love_letter.jpg', 
	bg_url: './img/love_letter/game.jpg',
	rule_url: 'files/love_letter.pdf',
	weight : 1.21, 
	min_players : 2, 
	max_players : 4
}, {
	id : '2', 
	name : "Le Fantôme de l'Opéra", 
	length : 30, 
	designer : 'Bruno Cathala', 
	img_url : './img/phantom_of_the_opera/phantom_of_the_opera.jpg', 
	rule_url: 'files/phantom_of_the_opera.pdf',
	weight : 2.19, 
	min_players : 2, 
	max_players : 2
}, {
	id : '3', 
	name : 'The Resistance: Avalon', 
	length : 30, 
	designer : 'Don Eskridge', 
	img_url : './img/avalon/avalon.jpg', 
	rule_url: 'files/avalon.pdf',
	weight : 1.78, 
	min_players : 5, 
	max_players : 10
}, {
	id : '4', 
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

export default function(state = initialState, { type, payload }) {
	switch(type) {
	default:
		return state;
	}
};