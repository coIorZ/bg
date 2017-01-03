import _ from 'lodash';

// ---------- cards ----------
let CARDS = {};
function registerCard(id, name, value, text, img, color = '#ffa500', width = 90, height = 126) {
	CARDS[id] = { id, name, value, text, img, color, width, height };
}

registerCard(-1, '', -1, 'Role Back', './img/phantom_of_the_opera/role_back.jpg');
registerCard(-2, '', -2, 'Alibi Back', './img/phantom_of_the_opera/alibi_back.jpg');
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
registerCard(17, 'Phantom', 9, '', './img/phantom_of_the_opera/phantom.jpg');

export { CARDS };


// ---------- tokens ----------
let TOKENS = {};
function registerToken(id, value, img, width = 50, height = 50) {
	TOKENS[id] = { id, value, img, width, height };
}

registerToken(1, 1, './img/phantom_of_the_opera/raoul_t.png');
registerToken(2, 2, './img/phantom_of_the_opera/meg_t.png');
registerToken(3, 3, './img/phantom_of_the_opera/madame_t.png');
registerToken(4, 4, './img/phantom_of_the_opera/joseph_t.png');
registerToken(5, 5, './img/phantom_of_the_opera/christine_t.png');
registerToken(6, 6, './img/phantom_of_the_opera/moncharmin_t.png');
registerToken(7, 7, './img/phantom_of_the_opera/richard_t.png');
registerToken(8, 8, './img/phantom_of_the_opera/persian_t.png');
registerToken(9, 1, './img/phantom_of_the_opera/raoul_t_i.png');
registerToken(10, 2, './img/phantom_of_the_opera/meg_t_i.png');
registerToken(11, 3, './img/phantom_of_the_opera/madame_t_i.png');
registerToken(12, 4, './img/phantom_of_the_opera/joseph_t_i.png');
registerToken(13, 5, './img/phantom_of_the_opera/christine_t_i.png');
registerToken(14, 6, './img/phantom_of_the_opera/moncharmin_t_i.png');
registerToken(15, 7, './img/phantom_of_the_opera/richard_t_i.png');
registerToken(16, 8, './img/phantom_of_the_opera/persian_t_i.png');

export { TOKENS };


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
	const cardId = 0;
	const suspect = 8;
	const actions = {move: false, effect: false, end: false};
	let lock;
	let rooms = {};
	let roles = [];
	let logs = [];
	const investigator = {
		id: players[1],
		alibis: []
	};
	let phantom = {
		id: players[0],
		alibis: []
	};
	for(let i = 0; i < 11; i++) {
		if(alibis[i] !== 17) {
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
	logs.push({
		en: `|p:${players[0]}| plays phantom.`,
		ch: `|p:${players[0]}|是魅影。`
	});
	logs.push({
		en: `|p:${players[1]}| plays investigator.`,
		ch: `|p:${players[1]}|是调查员。`
	});
	logs.push({en: `|hr:|`, ch: `|hr:|`});
	const pp = investigator.id;

	return { deck, alibis, turn, laCarlotta, exit, lock, rooms, roles, investigator, phantom, phase, cardId, suspect, actions, pp, logs };
}

function getCorridorByRooms(id1, id2) {
	for(let i = 1; i < 12; i++) {
		let corridor = CORRIDORS[i];
		if(corridor.indexOf(id1) >= 0 && corridor.indexOf(id2) >= 0) {
			return i;
		}
	}
}

function playCard(board, cardId) {
	let data = board.data;
	let { actions, turn, roles, investigator, phantom } = data;
	data.logs = [{
		en: `|p:${turn ? investigator.id : phantom.id}| plays |c:${cardId}|.`,
		ch: `|p:${turn ? investigator.id : phantom.id}|选择了|c:${cardId}|。`
	}];
	data.cardId = cardId;
	data.phase = 'choose.action';
	_.find(roles, r => r.id === cardId).available = false;
	actions.move = true;
	switch(cardId) {
	case 1:
	case 2:
	case 5:
	case 6:
	case 8:
		actions.effect = false;
		actions.end = false;
		break;
	case 3:
	case 4:
	case 7:
		actions.effect = true;
		actions.end = false;
		break;
	}

	return board;
}

function move(board) {
	let data = board.data;
	let { rooms, lock, cardId } = data;
	const isMeg = CARDS[cardId].value === 2;
	let room = _getRoomByCardId(rooms, cardId);
	let count = room.tokens.length - 1;
	let playableRooms = _around(room.id, lock);
	if(isMeg) {
		playableRooms = playableRooms.concat(ROOMS[room.id].passages);
	}
	if(count) {
		while(count--) {
			let res = [...playableRooms];
			_.each(res, id => {
				playableRooms = playableRooms.concat(_around(id, lock));
				if(isMeg) {
					playableRooms = playableRooms.concat(ROOMS[id].passages);
				}
			});
			playableRooms = _.pull(_.uniq(playableRooms), room.id);
		}
	}
	return playableRooms;
}

function _getRoomByCardId(rooms, id) {
	return _.find(rooms, r => {
		return r.tokens.indexOf(id) >= 0 || r.tokens.indexOf(id + 8) >= 0;
	});
}

function _getTokenByCardId(room, id) {
	return _.find(room.tokens, t => {
		return t === id || t === id + 8;
	});
}

function _pullTokenByCardId(room, id) {
	for(let i = 0, len = room.tokens.length; i < len; i++) {
		let token = room.tokens[i];
		if(token === id || token === id + 8) {
			return room.tokens.splice(i, 1)[0];
		}
	}
}

function _around(id, lock) {
	let res = [];
	const flag = CORRIDORS[lock].indexOf(id) >= 0;
	_.each(ROOMS[id].corridors, corridor => {
		if(!flag || CORRIDORS[lock].indexOf(corridor) < 0) {
			res.push(corridor);
		}
	});
	return res;
}

function action(board, payload) {
	let data = board.data;
	let { actions, cardId, rooms, turn, investigator, phantom, roles, lock, alibis, effect } = data;
	let room, token, targetRoom, player;
	data.logs = [];
	switch(payload.action) {
	case 'move':
		room = _getRoomByCardId(rooms, cardId);
		token = _pullTokenByCardId(room, cardId);
		rooms[payload.roomId].tokens.push(token);
		actions.move = false;
		data.logs.push({
			en: `|p:${turn ? investigator.id : phantom.id}| moves |c:${token}| from |r:${room.id}| to |r:${payload.roomId}|.`,
			ch: `|p:${turn ? investigator.id : phantom.id}|将|c:${token}|从|r:${room.id}|移动至|r:${payload.roomId}|。`
		});
		switch(cardId) {
		case 1:
			let alibi = alibis.shift();
			player = turn ? investigator : phantom;
			player.alibis.push(alibi);
			if(alibi === 17) {
				data.laCarlotta += turn ? -1 : 1;
			} else if(turn) {
				room = _getRoomByCardId(rooms, alibi - 8);
				_.each(room.tokens, (t, i) => {
					if(t === alibi - 8) {
						room.tokens[i] = alibi;
						data.suspect--;
					}
				});
			}
			data.logs.push({
				en: `|p:${turn ? investigator.id : phantom.id}| draws an alibi card.`,
				ch: `|p:${turn ? investigator.id : phantom.id}|抽取了一张不在场证明卡。`
			});
			actions.end = true;
			break;
		case 2:
		case 7:
			actions.effect = false;
			actions.end = true;
			break;
		case 3:
		case 4:
			actions.end = !actions.effect;
			break;
		case 5:
			actions.effect = true;
			actions.end = true;
			break;
		case 6:
			actions.effect = true;
			actions.end = true;
			targetRoom = rooms[payload.roomId];
			if(targetRoom.tokens.length === 1) {
				actions.effect = false;
			} else {
				data.effect = {
					to: targetRoom.id,
					tokens: _.without(targetRoom.tokens, 6, 14),
					rooms: _around(targetRoom.id, lock)
				};
			}
			break;
		case 8:
			actions.effect = true;
			actions.end = true;
			if(!room.tokens.length) {
				actions.effect = false;
			} else {
				data.effect = {
					from: room.id,
					to: payload.roomId
				};
			}
			break;
		}
		break;

	case 'effect':
		actions.effect = false;
		switch(cardId) {
		case 3:
			room = _getRoomByCardId(rooms, cardId);
			token = _getTokenByCardId(room, cardId);
			data.lock = payload.corridorId;
			data.logs.push({
				en: `|c:${token}| moves the padlock.`,
				ch: `|c:${token}|移动了锁。`
			});
			actions.end = !actions.move;
			break;
		case 4:
			room = _.find(rooms, r => !r.lit);
			room.lit = true;
			rooms[payload.roomId].lit = false;
			room = _getRoomByCardId(rooms, cardId);
			token = _getTokenByCardId(room, cardId);
			data.logs.push({
				en: `|c:${token}| fails power of |r:${payload.roomId}|.`,
				ch: `|c:${token}|熄灭了|r:${payload.roomId}|的灯。`
			});
			actions.end = !actions.move;
			break;
		case 5:
			room = _getRoomByCardId(rooms, cardId);
			token = _getTokenByCardId(room, cardId);
			_.each(_around(room.id, lock), id => {
				room.tokens = room.tokens.concat(rooms[id].tokens);
				rooms[id].tokens = [];
			});
			data.logs.push({
				en: `|c:${token}| attracts characters in all adjacent rooms.`,
				ch: `|c:${token}|吸引了相邻房间的角色。`
			});
			break;
		case 6:
			room = _getRoomByCardId(rooms, cardId);
			token = _getTokenByCardId(room, cardId);
			_.pull(rooms[effect.to].tokens, payload.tokenId);
			_.pull(effect.tokens, payload.tokenId);
			rooms[payload.roomId].tokens.push(payload.tokenId);
			if(!effect.tokens.length) {
				actions.end = true;
			}
			data.logs.push({
				en: `|c:${token}| causes |c:${payload.tokenId}| to flee to |r:${payload.roomId}|.`,
				ch: `|c:${token}|将|c:${payload.tokenId}|驱赶至|r:${payload.roomId}|。`
			});
			break;
		case 7:
			room = _getRoomByCardId(rooms, cardId);
			token = _pullTokenByCardId(room, cardId);
			targetRoom = _getRoomByCardId(rooms, payload.tokenId);
			room.tokens.push(payload.tokenId);
			_.pull(targetRoom.tokens, payload.tokenId);
			targetRoom.tokens.push(token);
			actions.move = false;
			actions.end = true;
			data.logs.push({
				en: `|c:${token}| swap places with |c:${payload.tokenId}|.`,
				ch: `|c:${token}|与|c:${payload.tokenId}|交换了位置。`
			});
			break;
		case 8:
			room = _getRoomByCardId(rooms, cardId);
			token = _getTokenByCardId(room, cardId);
			_.pull(rooms[effect.from].tokens, payload.tokenId);
			rooms[payload.roomId].tokens.push(payload.tokenId);
			actions.end = true;
			data.logs.push({
				en: `|c:${token}| drops |c:${payload.tokenId}| in |r:${payload.roomId}|.`,
				ch: `|c:${token}|将|c:${payload.tokenId}|放至|r:${payload.roomId}|。`
			});
			break;
		}
		break;

	case 'end':
		const n = _.filter(roles, role => role.available).length;
		data.phase = 'play.card';
		data.logs.push({en: `|hr:|`, ch: `|hr:|`});
		if(n !== 2) {
			data.turn = !turn;
			data.pp = data.turn ? investigator.id : phantom.id;
		} 
		if(n === 0) {
			endRound(data);
		}
		break;
	}
	return board;
}

function endRound(data) {
	let { deck, turn, rooms, phantom, exit } = data;
	let room = _getRoomByCardId(rooms, phantom.phantom - 8);
	let appear = !room.lit || room.tokens.length === 1;
	_.each(rooms, r => {
		_.each(r.tokens, (t, i) => {
			if(t !== phantom.phantom - 8 && t <= 8 && ((appear && r.lit && r.tokens.length > 1) || (!appear && (!r.lit || r.tokens.length === 1)))) {
				r.tokens[i] += 8;
				data.suspect--;
			}
		});
	});
	data.logs.push({
		en: `Round ends. Phantom ${appear ? 'appears' : 'can not appear'}.`,
		ch: `回合结束。魅影${appear ? '出现了' : '没有出现'}。`
	});
	data.logs.push({
		en: `${data.suspect} remaining suspects.`,
		ch: `还剩${data.suspect}个嫌犯。`
	});
	data.logs.push({en: `|hr:|`, ch: `|hr:|`});
	if(data.suspect <= 1) {
		investigatorWin(data);
	} else {
		data.laCarlotta += appear ? data.suspect + 1 : data.suspect;
		if(data.laCarlotta >= exit) {
			phantomWin(data);
		} else {
			if(deck.length) {
				data.roles = deck.map(id => {
					return { id, available: true};
				});
				data.deck = [];
			} else {
				data.roles = [];
				data.deck = _.shuffle([1,2,3,4,5,6,7,8]);
				data.roles.push({id: data.deck.shift(), available: true});
				data.roles.push({id: data.deck.shift(), available: true});
				data.roles.push({id: data.deck.shift(), available: true});
				data.roles.push({id: data.deck.shift(), available: true});
			}
		}
	}
}

function investigatorWin(data) {
	data.phase = 'game';
	data.winner = data.investigator;
	data.logs.push({
		en: `|p:${data.winner.id}| wins the game!`,
		ch: `|p:${data.winner.id}|获胜！`
	});
}

function phantomWin(data) {
	data.phase = 'game';
	data.winner = data.phantom;
	data.logs.push({
		en: `|p:${data.winner.id}| wins the game!`,
		ch: `|p:${data.winner.id}|获胜！`
	});
}

function effect(board, which) {
	let data = board.data;
	let { cardId, lock, rooms, effect } = data;
	let playableRooms = [], tokens = [], corridors = [];
	const action = 'effect';
	switch(cardId) {
	case 3:
		corridors = _.pull([1,2,3,4,5,6,7,8,9,10,11], lock);
		break;
	case 4:
		let room = _.find(rooms, r => !r.lit);
		playableRooms = _.pull([1,2,3,4,5,6,7,8,9,10], room.id);
		break;
	case 6:
		if(which === 'token') {
			tokens = effect.tokens;
		} else if(which === 'room') {
			playableRooms = effect.rooms;
		}
		break;
	case 7:
		tokens = [1,2,3,4,5,6,8,9,10,11,12,13,14,16];
		break;
	case 8:
		if(which === 'token') {
			tokens = rooms[effect.from].tokens;
		} else if(which === 'room') {
			const n = rooms[effect.from].tokens.length + 1;
			playableRooms = _path(effect.from, effect.to, n, lock);
		}
		break;
	}
	return { action, rooms: playableRooms, tokens, corridors };
}

function _path(from, to, n, lock) {
	let path = [], steps = {}, step = 1;
	steps[step] = _around(from, lock);
	while(--n) {
		_.each(steps[step++], id => {
			steps[step] = steps[step] || [];
			steps[step] = steps[step].concat(_around(id, lock));
		});
		steps[step] = _.uniq(steps[step]);
	}
	_.each(steps, (rooms, step) => {
		if(rooms.indexOf(to) >= 0) {
			path = path.concat(_step(to, steps, +step, []));
		}
	});
	return _.uniq(path).concat(to);
}

function _step(to, steps, step, path) {
	while(--step) {
		_.each(ROOMS[to].corridors, c => {
			if(steps[step].indexOf(c) >= 0) {
				path.push(c);
				if(step > 1) {
					path = path.concat(_step(c, steps, step, path));
				}
			}
		})
	}
	return path;
}


export default {
	create,
	playCard,
	action,
	move,
	effect
};