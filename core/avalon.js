import _ from 'lodash';

// ---------- cards & deck ----------
let CARDS = {};
function registerCard(id, name, value, text, img, quantity = 1, color = '#ffa500') {
	CARDS[id] = { id, name, value, text, img, quantity, color };
}

registerCard(1, 'Merlin', 1, '', './img/avalon/merlin.jpg');
registerCard(2, 'Percival', 2, '', './img/avalon/percival.jpg');
registerCard(3, 'Loyal Servant', 3, '', './img/avalon/loyal_1.jpg');
registerCard(4, 'Loyal Servant', 3, '', './img/avalon/loyal_2.jpg');
registerCard(5, 'Loyal Servant', 3, '', './img/avalon/loyal_3.jpg');
registerCard(6, 'Loyal Servant', 3, '', './img/avalon/loyal_4.jpg');
registerCard(7, 'Loyal Servant', 3, '', './img/avalon/loyal_5.jpg');
registerCard(8, 'Mordred', 4, '', './img/avalon/mordred.jpg');
registerCard(9, 'Assassin', 5, '', './img/avalon/assassin.jpg');
registerCard(10, 'Morcana', 6, '', './img/avalon/morcana.jpg');
registerCard(11, 'Oberon', 7, '', './img/avalon/oberon.jpg');
registerCard(12, 'Evil Minion', 8, '', './img/avalon/evil_1.jpg');
registerCard(13, 'Evil Minion', 8, '', './img/avalon/evil_2.jpg');
registerCard(14, 'Evil Minion', 8, '', './img/avalon/evil_3.jpg');


// ---------- logic ----------
function create(table) {
	const players = _.shuffle(table.players);
	const data = setup(players);
}

function setup(people) {
	const size = _.size(people);
	
}

export default {
	create
}