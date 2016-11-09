import _ from 'lodash';

// ---------- cards ----------
let CARDS = {};
function registerCard(id, name, value, text, func) {
	CARDS[id] = { id, name, value, text, func};
}
function cloneCard(src, dest) {
	if(!_.isArray(dest)) dest = [dest];
	_.each(dest, id => CARDS[id] = {...CARDS[src], id});
}

registerCard(1, 'Guard', 1, '', () => {

});

registerCard(2, 'Priest', 2, '', () => {

});

registerCard(3, 'Baron', 3, '', () => {

});

registerCard(4, 'Handmaid', 4, '', () => {

});

registerCard(5, 'Prince', 5, '', () => {

});

registerCard(6, 'King', 6, '', () => {

});

registerCard(7, 'Countess', 7, '', () => {

});

registerCard(8, 'Princess', 8, '', () => {

});

cloneCard(1, [9, 10, 11, 12]);
cloneCard(2, 13);
cloneCard(3, 14);
cloneCard(4, 15);
cloneCard(5, 16);

export { CARDS };

// ---------- cards ----------
function deckBuilder(size) {
	let deck = [];
	while(size) {
		deck.unshift(size);
		size--;
	}
	return deck;
}

const DECK = deckBuilder(16);

export { DECK };


// ---------- logic ----------
function create(table) {
	table.started = true;
	const players = _.shuffle(table.players);
	const data = setup(players);
	const board = { table, data };
	console.log(board);
	return board;
}

function setup(people, winner) {
	const size = _.size(people);
	let deck = _.shuffle(DECK);
	let removedFaceUp = [];
	let vp = 4;
	let players = [];
	const removedFaceDown = deck.shift();
	if(size === 2) {
		removedFaceUp.push(deck.shift());
		removedFaceUp.push(deck.shift());
		removedFaceUp.push(deck.shift());
		vp = 7;
	} else if(size === 3) {
		vp = 5;
	}
	if(winner) {
		players = _.map(people, player => {
			return {
				...player,
				hands: player.player === winner ? [deck.shift(), deck.shift()] : [deck.shift()]
			};
		});
	} else {
		players = _.map(people, (player, i) => {
			return i === 0 ? { player, hands: [deck.shift(), deck.shift()], vp: 0 } 
							: { player, hands: [deck.shift()], vp: 0 };
		});
	}
	return { deck, players, vp, removedFaceUp, removedFaceDown, activePlayer: winner || players[0].player };
}


export default {
	create
};
