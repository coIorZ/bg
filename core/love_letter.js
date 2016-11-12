import _ from 'lodash';

// ---------- cards & deck ----------
let CARDS = {}, DECK = [];
function registerCard(id, name, value, text, img, func, quantity = 1) {
	CARDS[id] = { id, name, value, text, img, func, quantity };
	while(quantity) {
		DECK.push(id);
		quantity--;
	}
}

registerCard(1, 'Guard', 1, '', './img/love_letter/guard.jpg', () => {

}, 5);

registerCard(2, 'Priest', 2, '', './img/love_letter/priest.jpg', () => {

}, 2);

registerCard(3, 'Baron', 3, '', './img/love_letter/baron.jpg', () => {

}, 2);

registerCard(4, 'Handmaid', 4, '', './img/love_letter/handmaid.jpg', () => {

}, 2);

registerCard(5, 'Prince', 5, '', './img/love_letter/prince.jpg', () => {

}, 2);

registerCard(6, 'King', 6, '', './img/love_letter/king.jpg', () => {

});

registerCard(7, 'Countess', 7, '', './img/love_letter/countess.jpg', () => {

});

registerCard(8, 'Princess', 8, '', './img/love_letter/princess.jpg', () => {

});

export { CARDS };
export { DECK };


// ---------- logic ----------
function create(table) {
	table.started = true;
	const players = _.shuffle(table.players);
	const data = draw(setup(players));
	const board = { table, data };
	// console.log(board);
	return board;
}

function setup(people, winner) {
	const size = _.size(people);
	let deck = _.shuffle(DECK);
	let removedFaceUp = [];
	let vp = 4;
	let players = [];
	const removedFaceDown = deck.shift();
	const activePlayer = 0;
	if(size === 2) {
		removedFaceUp.push(deck.shift());
		removedFaceUp.push(deck.shift());
		removedFaceUp.push(deck.shift());
		vp = 7;
	} else if(size === 3) {
		vp = 5;
	}
	players = _.map(people, player => {
		return {
			id: player,
			hands: [deck.shift()],
			vp: 0,
			discarded: [],
			lastPlayed: null
		};
	});
	
	return { deck, players, vp, removedFaceUp, removedFaceDown, activePlayer };
}

function draw(data) {
	let { deck, players, activePlayer } = data;
	players[activePlayer].hands.push(deck.shift());
	return data;
}


export default {
	create
};
