import _ from 'lodash';

// ---------- cards ----------
let CARDS = {};
function registerCard(id, name, value, text, img, color = '#ffa500') {
	CARDS[id] = { id, name, value, text, img, color };
}

registerCard(1, 'Raoul De Chagny', 1, '', './img/phantom_of_the_opera/raoul.jpg');
registerCard(2, 'Meg Giry', 2, '', './img/phantom_of_the_opera/meg.jpg');
registerCard(3, 'Madame Giry', 3, '', './img/phantom_of_the_opera/madame.jpg');
registerCard(4, 'Joseph Buquet', 4, '', './img/phantom_of_the_opera/joseph.jpg');
registerCard(5, 'Christine Daeé', 5, '', './img/phantom_of_the_opera/christine.jpg');
registerCard(6, 'M. Moncharmin', 6, '', './img/phantom_of_the_opera/moncharmin.jpg');
registerCard(7, 'M. Richard', 7, '', './img/phantom_of_the_opera/richard.jpg');
registerCard(8, 'The Persian', 8, '', './img/phantom_of_the_opera/persian.jpg');
registerCard(9, 'Raoul De Chagny', 1, '', './img/phantom_of_the_opera/raoul_i.jpg');
registerCard(10, 'Meg Giry', 2, '', './img/phantom_of_the_opera/meg_i.jpg');
registerCard(11, 'Madame Giry', 3, '', './img/phantom_of_the_opera/madame_i.jpg');
registerCard(12, 'Joseph Buquet', 4, '', './img/phantom_of_the_opera/joseph_i.jpg');
registerCard(13, 'Christine Daeé', 5, '', './img/phantom_of_the_opera/christine_i.jpg');
registerCard(14, 'M. Moncharmin', 6, '', './img/phantom_of_the_opera/moncharmin_i.jpg');
registerCard(15, 'M. Richard', 7, '', './img/phantom_of_the_opera/richard_i.jpg');
registerCard(16, 'The Persian', 8, '', './img/phantom_of_the_opera/persian_i.jpg');
registerCard(17, 'Phantom', 9, '', './img/phantom_of_the_opera/phantom.png');

export { CARDS };


// ---------- tokens ----------
let TOKENS = {};
function registerToken(id, value, img) {
	TOKENS[id] = { id, value, img };
}

registerToken(1, 1, './img/phantom_of_the_opera/raoul_t.jpg');
registerToken(2, 2, './img/phantom_of_the_opera/meg_t.jpg');
registerToken(3, 3, './img/phantom_of_the_opera/madame_t.jpg');
registerToken(4, 4, './img/phantom_of_the_opera/joseph_t.jpg');
registerToken(5, 5, './img/phantom_of_the_opera/christine_t.jpg');
registerToken(6, 6, './img/phantom_of_the_opera/moncharmin_t.jpg');
registerToken(7, 7, './img/phantom_of_the_opera/richard_t.jpg');
registerToken(8, 8, './img/phantom_of_the_opera/persian_t.jpg');
registerToken(9, 1, './img/phantom_of_the_opera/raoul_t_i.jpg');
registerToken(10, 2, './img/phantom_of_the_opera/meg_t_i.jpg');
registerToken(11, 3, './img/phantom_of_the_opera/madame_t_i.jpg');
registerToken(12, 4, './img/phantom_of_the_opera/joseph_t_i.jpg');
registerToken(13, 5, './img/phantom_of_the_opera/christine_t_i.jpg');
registerToken(14, 6, './img/phantom_of_the_opera/moncharmin_t_i.jpg');
registerToken(15, 7, './img/phantom_of_the_opera/richard_t_i.jpg');
registerToken(16, 8, './img/phantom_of_the_opera/persian_t_i.jpg');


// ---------- rooms ----------
const ROOMS = {
	'1': {id: 1, tokens: [], lit: true, corridors: [2, 8], passages: [3, 9]},
	'2': {id: 2, tokens: [], lit: true, corridors: [3, 1], passages: [10]},
	'3': {id: 3, tokens: [], lit: true, corridors: [4, 10, 2], passages: [1]},
	'4': {id: 4, tokens: [], lit: true, corridors: [3, 5], passages: []},
	'5': {id: 5, tokens: [], lit: true, corridors: [4, 6], passages: [8, 10]},
	'6': {id: 6, tokens: [], lit: true, corridors: [5, 7], passages: [9]},
	'7': {id: 7, tokens: [], lit: true, corridors: [6, 8], passages: []},
	'8': {id: 8, tokens: [], lit: true, corridors: [7, 1, 9], passages: [5]},
	'9': {id: 9, tokens: [], lit: true, corridors: [8, 10], passages: [1, 6]},
	'10': {id: 10, tokens: [], lit: true, corridors: [9, 3], passages: [2, 5]}
};


// ---------- corridors ----------
const CORRIDORS = {
	'1': [1, 2],
	'2': [2, 3],
	'3': [3, 4],
	'4': [3, 10],
	'5': [4, 5],
	'6': [5, 6],
	'7': [6, 7],
	'8': [7, 8],
	'9': [8, 1],
	'10': [8, 9],
	'11': [9, 10]
};


// ---------- logic ----------
function create(table) {
	const players = _.shuffle(table.players);
	const data = setup(players);
	const board = { table, data };
	return board;
}

function setup(players) {
	let deck = _.shuffle([1,2,3,4,5,6,7,8]);
	let alibis = _.shuffle([9,10,11,12,13,14,15,16,17,17,17]);
	const turn = true;  // ture-investigator  false-phantom
	const laCarlotta = 4;
	const exit = 22;
	const phase = 'play.card';
	let lock;
	let rooms = {};
	let roles = [];
	let logs = [];
	const investigator = {
		player: players[1],
		alibis: []
	};
	let phantom = {
		player: players[0],
		alibis: []
	};
	for(let i = 0; i < 11; i++) {
		if(alibis[i] !== 9) {
			phantom.phantom = alibis.splice(i, 1)[0];
			break;
		}
	}
	_.each(_.shuffle(deck), (role, i) => {
		let room = rooms[i + 1] = {id: i + 1, lit: true, tokens: []};
		room.tokens.push(role);
		if(role === 4) {
			room.lit = false;
		} else if(role === 3) {
			lock = getCorridorByRooms(room.id, ROOMS[room.id].corridors[0]);
		}
	});
	rooms['9'] = {id: 9, lit: true, tokens: []};
	rooms['10'] = {id: 10, lit: true, tokens: []};
	deck = _.shuffle(deck);
	roles.push({id: deck.shift(), available: true});
	roles.push({id: deck.shift(), available: true});
	roles.push({id: deck.shift(), available: true});
	roles.push({id: deck.shift(), available: true});
	logs.push(`|p:${players[0]}| plays phantom.`);
	logs.push(`|p:${players[1]}| plays investigator.`);

	return { deck, alibis, turn, laCarlotta, exit, lock, rooms, roles, investigator, phantom, phase, logs };
}

function getCorridorByRooms(id1, id2) {
	for(let i = 1; i < 12; i++) {
		let corridor = CORRIDORS[i];
		if(corridor.indexOf(id1) >= 0 && corridor.indexOf(id2) >= 0) {
			return i;
		}
	}
}


export default {
	create
};