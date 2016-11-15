const initialState = [{
	id : '1', 
	name : 'Love Letter', 
	length : 20, 
	designer : 'Seiji Kanai', 
	img_url : './img/love_letter.jpg', 
	rule_url: 'files/love_letter.pdf',
	weight : 1.21, 
	min_players : 2, 
	max_players : 4
}, {
	id : '2', 
	name : 'Coup', 
	length : 15, 
	designer : 'Rikki Tahta', 
	img_url : './img/coup.jpg', 
	rule_url: 'files/coup.jpg',
	weight : 1.44, 
	min_players : 2, 
	max_players : 6
}];

export default function(state = initialState, { type, payload }) {
	switch(type) {
	default:
		return state;
	}
};