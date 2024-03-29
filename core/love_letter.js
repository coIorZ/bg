import _ from 'lodash';

// ---------- cards & deck ----------
let CARDS = {}, DECK = [];
function registerCard(id, name, value, text, img, quantity = 1, color = '#ffa500', width = 90, height = 126) {
	CARDS[id] = { id, name, value, text, img, quantity, color, width, height };
	while(quantity && id > 0) {
		DECK.push(id);
		quantity--;
	}
}

registerCard(-1, '', -1, 'Back', './img/love_letter/back.jpg');
registerCard(1, 'Guard', 1, '', './img/love_letter/guard.jpg', 5);
registerCard(2, 'Priest', 2, '', './img/love_letter/priest.jpg', 2);
registerCard(3, 'Baron', 3, '', './img/love_letter/baron.jpg', 2);
registerCard(4, 'Handmaid', 4, '', './img/love_letter/handmaid.jpg', 2);
registerCard(5, 'Prince', 5, '', './img/love_letter/prince.jpg', 2);
registerCard(6, 'King', 6, '', './img/love_letter/king.jpg');
registerCard(7, 'Countess', 7, '', './img/love_letter/countess.jpg');
registerCard(8, 'Princess', 8, '', './img/love_letter/princess.jpg');

export { CARDS };
export { DECK };


// ---------- logic ----------
function create(table) {
	const players = _.shuffle(table.players);
	const data = setup(players);
	const board = { table, data };
	return board;
}

function setup(people) {
	const size = _.size(people);
	let deck = _.shuffle(DECK);
	let removedFaceUp = [];
	let vp = 4;
	let players = [];
	const removedFaceDown = deck.shift();
	const activePlayer = 0;
	const cardId = 0;
	const phase = 'play.card';
	const effect = null;
	const winner = null;
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
			lastPlayed: null,
			out: false
		};
	});
	players[0].hands.push(deck.shift());
	const pp = players[0].id;
	const logs = [{
		en: `|p:${players[0].id}| draws a card.`,
		ch: `|p:${players[0].id}|抽了一张牌。`
	}];
	
	return { deck, players, vp, removedFaceUp, removedFaceDown, activePlayer, cardId, phase, effect, winner, pp, logs };
}

function drawCard(data, player) {
	if(!player.out) {
		if(data.deck.length) {
			player.hands.push(data.deck.shift());
		} else {
			player.hands.push(data.removedFaceDown);
			data.removedFaceDown = 0;
		}
		data.logs.push({
			en: `|p:${player.id}| draws a card.`,
			ch: `|p:${player.id}|抽了一张牌。`
		});
	}
}

function discardCard(data, player, cardId) {
	player.hands.splice(_.indexOf(player.hands, cardId), 1);
	player.discarded.push(cardId);
	if(cardId === 8) {
		player.out = true;
	}
	if(player.out) {
		data.logs.push({
			en: `|p:${player.id}| is knocked out.`,
			ch: `|p:${player.id}|被踢出局了。`
		});
	}
}

function playCard(board, cardId) {
	let data = board.data;
	let player = data.players[data.activePlayer];
	data.logs = [];
	player.lastPlayed = cardId;
	data.cardId = cardId;
	switch(cardId) {
	case 1:
	case 2:
	case 3:
	case 5:
	case 6:
		data.phase = 'choose.player';
		discardCard(data, player, cardId);
		break;
	case 4:
	case 7:
		data.logs.push({
			en: `|p:${player.id}| plays |c:${cardId}|.`,
			ch: `|p:${player.id}|打出了|c:${cardId}|。`
		});
		discardCard(data, player, cardId);
		nextTurn(data);
		break;
	case 8:
		data.logs.push({
			en: `|p:${player.id}| plays |c:${cardId}|.`,
			ch: `|p:${player.id}|打出了|c:${cardId}|。`
		});
		discardCard(data, player, cardId);
		nextTurn(data);
		break;
	}

	return board;
}

function choosePlayer(board, playerId) {
	let data = board.data;
	const { players, activePlayer, cardId } = data;
	let targetPlayer = _.find(players, player => player.id === playerId);
	let currentPlayer = players[activePlayer];
	data.logs = [];
	switch(cardId) {
	case 1:
	case 2:
		if(targetPlayer.lastPlayed !== 4) {
			data.phase = 'effect';
			data.effect = playerId;
		} else {
			data.logs.push({
				en: `|p:${currentPlayer.id}| plays |c:${cardId}| against |p:${targetPlayer.id}|.`,
				ch: `|p:${currentPlayer.id}|对|p:${targetPlayer.id}|打出了|c:${cardId}|。`
			});
			data.logs.push({
				en: 'blocked by |c:4|.',
				ch: '被|c:4|抵挡了。'
			});
			nextTurn(data);
		}
		break;
	case 3:
		data.logs.push({
			en: `|p:${currentPlayer.id}| plays |c:${cardId}| against |p:${targetPlayer.id}|.`,
			ch: `|p:${currentPlayer.id}|对|p:${targetPlayer.id}|打出了|c:${cardId}|。`
		});
		if(targetPlayer.lastPlayed !== 4) {
			const targetCard = targetPlayer.hands[0];
			const currentCard = currentPlayer.hands[0];
			if(targetCard > currentCard) {
				currentPlayer.out = true;
				discardCard(data, currentPlayer, currentCard);
			} else if(targetCard < currentCard) {
				targetPlayer.out = true;
				discardCard(data, targetPlayer, targetCard);
			}
		} else {
			data.logs.push({
				en: 'blocked by |c:4|.',
				ch: '被|c:4|抵挡了。'
			});
		}
		nextTurn(data);
		break;
	case 5:
		data.logs.push({
			en: `|p:${currentPlayer.id}| plays |c:${cardId}| against |p:${targetPlayer.id}|.`,
			ch: `|p:${currentPlayer.id}|对|p:${targetPlayer.id}|打出了|c:${cardId}|。`
		});
		if(targetPlayer.lastPlayed !== 4 || targetPlayer.id === currentPlayer.id) {
			data.logs.push({
				en: `|p:${targetPlayer.id}| discards |c:${targetPlayer.hands[0]}|.`,
				ch: `|p:${targetPlayer.id}|丢弃了|c:${targetPlayer.hands[0]}|。`
			});
			discardCard(data, targetPlayer, targetPlayer.hands[0]);
			drawCard(data, targetPlayer);
		} else {
			data.logs.push({
				en: 'blocked by |c:4|.',
				ch: '被|c:4|抵挡了。'
			});
		}
		nextTurn(data);
		break;
	case 6:
		data.logs.push({
			en: `|p:${currentPlayer.id}| plays |c:${cardId}| against |p:${targetPlayer.id}|.`,
			ch: `|p:${currentPlayer.id}|对|p:${targetPlayer.id}|打出了|c:${cardId}|。`
		});
		if(targetPlayer.lastPlayed !== 4) {
			const targetCard = targetPlayer.hands[0];
			const currentCard = currentPlayer.hands[0];
			currentPlayer.hands = [targetCard];
			targetPlayer.hands = [currentCard];
		} else {
			data.logs.push({
				en: 'blocked by |c:4|.',
				ch: '被|c:4|抵挡了。'
			});
		}
		nextTurn(data);
		break;
	}
	return board;
}

function effect(board, payload) {
	let data = board.data;
	const { players, effect, activePlayer, cardId } = data;
	let player = _.find(players, player => player.id === effect);
	data.logs = [];
	switch(data.cardId) {
	case 1:
		data.logs.push({
			en: `|p:${players[activePlayer].id}| plays |c:${cardId}| against |p:${player.id}| on |c:${payload.cardId}|.`,
			ch: `|p:${players[activePlayer].id}|对|p:${player.id}|打出了|c:${cardId}|，猜其为|c:${payload.cardId}|。`
		});
		if(player.hands[0] === payload.cardId) {
			player.out = true;
			discardCard(data, player, payload.cardId);
		}
		nextTurn(data);
		break;
	case 2:
		data.logs.push({
			en: `|p:${players[activePlayer].id}| plays |c:${cardId}| against |p:${player.id}|.`,
			ch: `|p:${players[activePlayer].id}|对|p:${player.id}|打出了|c:${cardId}|。`
		});
		nextTurn(data);
		break;
	}
	return board;
}

function nextTurn(data) {
	let deck = data.deck;
	data.logs.push({en: `|hr:|`, ch: `|hr:|`});
	const remainingPlayers = _.filter(data.players, player => !player.out);
	if(remainingPlayers.length === 1) {
		lastManStanding(data, remainingPlayers[0].id);
	} else if(deck.length === 0) {
		highestWinning(data);
	} else {
		let { activePlayer, players } = data;
		do {
			activePlayer = (activePlayer + 1) % players.length;
		} while(players[activePlayer].out)
		data.activePlayer = activePlayer;
		data.pp = data.players[activePlayer].id;
		data.phase = 'play.card';
		drawCard(data, players[activePlayer]);
	}
}

function lastManStanding(data, playerId) {
	const { players, vp } = data;
	let player;
	_.each(players, p => {
		if(p.id === playerId) {
			player = p;
		} else {
			p.out = true;
		}
	});
	player.vp++;
	data.winner = _.indexOf(players, player);
	if(player.vp === vp) {
		gameOver(data);
	} else {
		endRound(data);
	}
}

function highestWinning(data) {
	const { players, vp } = data;
	let remainingPlayers = _.without(players, player => player.out);
	let player = _.maxBy(remainingPlayers, p => p.hands[0]);
	let maxPlayers = _.filter(players, p => p.hands[0] === player.hands[0]);
	player = _.maxBy(maxPlayers, p => _.sum(p.discarded));
	_.each(remainingPlayers, p => {
		if(p.id !== player.id) {
			p.out = true;
		}
	});
	player.vp++;
	data.winner = _.indexOf(players, player);
	if(player.vp === vp) {
		gameOver(data);
	} else {
		endRound(data);
	}
}

function endRound(data) {
	data.phase = 'round';
}

function round(board) {
	let data = board.data;
	let { players, winner } = data;
	data.deck = _.shuffle(DECK);
	data.removedFaceUp = [];
	data.removedFaceDown = data.deck.shift();
	data.activePlayer = winner;
	data.phase = 'play.card';
	if(players.length === 2) {
		data.removedFaceUp.push(data.deck.shift());
		data.removedFaceUp.push(data.deck.shift());
		data.removedFaceUp.push(data.deck.shift());
	}
	_.each(players, player => {
		player.hands = [data.deck.shift()];
		player.discarded = [];
		player.lastPlayed = null;
		player.out = false;
	});
	players[winner].hands.push(data.deck.shift());
	data.logs = [{
		en: 'a new round starts.',
		ch: '新回合开始。'
	}];
	data.logs.push({
		en: `|p:${players[winner].id}| draws a card.`,
		ch: `|p:${players[winner].id}|抽了一张牌。`
	});
	return board;
}

function gameOver(data) {
	data.phase = 'game';
	data.logs.push({
		en: `|p:${data.players[data.winner].id}| is the winner!`,
		ch: `|p:${data.players[data.winner].id}|获胜！`
	});
}

export default {
	create,
	playCard,
	choosePlayer,
	effect,
	round
};
