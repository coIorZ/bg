import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';

import Card from './card';
import Actions from './actions';
import Score from './score';
import Log from './log';
import CardViewer from '../card_viewer';
import styles from './phantom_of_the_opera.css';

import socket from '../../sockets';
import poto, { CARDS, TOKENS } from '../../../core/phantom_of_the_opera';
import { updateBoard, setBoardVisible } from '../../actions';

class POTO extends Component {
	constructor(props) {
		super(props);
		this.handlePlayRole = this.handlePlayRole.bind(this);
		this.handleMove = this.handleMove.bind(this);
		this.handleEffect = this.handleEffect.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
		this.handleConfirmGame = this.handleConfirmGame.bind(this);
		this.state = {
			action: '',
			rooms: [],
			tokens: [],
			corridors: []
		};
	}

	componentWillReceiveProps({ board }) {
		if(board != this.props.board && this.state.action === 'effect') {
			const { cardId, effect } = board.data;
			if(cardId === 6) {
				this.setState({tokens: effect.tokens});
			}
		}
	}

	render() {
		const { clientHeight, board, user, users, logs } = this.props;
		const { table, data } = board;
		const { deck, alibis, turn, laCarlotta, exit, lock, rooms, roles, investigator, phantom, actions, phase, winner } = data;
		const isPhantom = phantom.player === user._id;
		const myself = isPhantom ? phantom : investigator;
		const opponent = isPhantom ? investigator : phantom;
		const myTurn = (isPhantom && !turn) || (!isPhantom && turn);
		const watch = phantom.player !== user._id && investigator.player !== user._id;
		return (
			<div 
				className={styles.container}
				style={{height: clientHeight}}
			>
				<div 
					className={styles.board}
					style={{
						top: (clientHeight - 450) / 2
					}}
				>
					<img src='./img/phantom_of_the_opera/board.jpg' className={styles.bg} />
					<div style={{position: 'absolute', left: 30, top: 20}}>
						<div className={styles.label}>Deck({deck.length})</div>
						<Card display={0} />
					</div>
					<div style={{position: 'absolute', left: 110, top: 20}}>
						<div className={styles.label}>Alibis({alibis.length})</div>
						<Card display={-1} />
					</div>
					<div style={{position: 'absolute', right: 140, bottom: 15, color: 'red'}}>
						La Carlotta: {laCarlotta}
					</div>
					<div style={{position: 'absolute', right: 40, bottom: 15}}>
						Exit: {exit}
					</div>
					{_.map(rooms, room => {
						return <div 
									style={{
										position: 'absolute',
										left: roomUI[room.id].left,
										top: roomUI[room.id].top,
										width: roomUI[room.id].width,
										height: roomUI[room.id].height
									}}
									key={room.id}
								>
									<div 
										className={cx({
											[styles.room]: true,
											[styles.dark]: !room.lit,
											[styles.playable]: !watch && this.state.rooms.indexOf(room.id) >= 0
										})}
										onMouseDown={this.handleClickRoom.bind(this, room.id)}
									>
										{room.id}
									</div>
									{room.tokens.map(token => {
										return <Card 
													id={token} 
													display={3} 
													playable={!watch && this.state.tokens.indexOf(token) >= 0}
													onMouseDown={this.handleClickToken.bind(this, token)}
													key={token} 
												/>
									})}
									{room.lit ? null
										: <img src='./img/phantom_of_the_opera/power_failure.png' className={styles.tool} />
									}
								</div>
					})}
					{_.map(corridorUI, corridor => {
						return <div
									className={cx({
										[styles.corridor]: true,
										[styles.playable]: !watch && this.state.corridors.indexOf(corridor.id) >= 0
									})}
									style={{
										left: corridor.left,
										top: corridor.top
									}}
									key={corridor.id}
									onMouseDown={this.handleClickCorridor.bind(this, corridor.id)}
								>
									{lock === corridor.id ?
										<img src='./img/phantom_of_the_opera/pad_lock.png' className={styles.tool} />
										: null
									}
								</div>
					})}
				</div>
				<div 
					className={styles['roles-holder']}
					style={{
						top: (clientHeight - 450) / 2 + 20
					}}
				>
					{roles.map(role => {
						return <Card 
									id={role.id} 
									display={1} 
									playable={!watch && phase === 'play.card' && myTurn && role.available}
									used={!role.available}
									key={role.id}
									onMouseDown={this.handlePlayRole}
								/>
					})}
				</div>
				<div 
					className={styles['actions-holder']}
					style={{
						top: (clientHeight - 450) / 2 + 130
					}}
				>
					<Actions 
						visible={!watch && myTurn && phase === 'choose.action'}
						actions={actions} 
						onClickMove={this.handleMove}
						onClickEffect={this.handleEffect}
						onClickEnd={this.handleEnd}
					/>
				</div>
				<div className={cx({
					[styles.opponent]: true,
					[styles.player]: true,
					[styles.active]: !myTurn
				})}>
					<div className={styles.name}>{users[opponent.player].name}</div>
					<div className={styles.identity}>{!isPhantom ? 'Phantom' : 'The Investigator'}</div>
					{!isPhantom ? 
						<div className={styles['phantom-holder']}>
							<div className={styles.label}>Phantom</div>
							<Card display={-1} />
						</div>
						: null
					}
				</div>
				<div className={cx({
					[styles.myself]: true,
					[styles.player]: true,
					[styles.active]: myTurn
				})}>
					<div className={styles.name}>{users[myself.player].name}</div>
					<div className={styles.identity}>{isPhantom ? 'Phantom' : 'The Investigator'}</div>
					{isPhantom ? 
						<div className={styles['phantom-holder']}>
							<Card 
								id={myself.phantom} 
								display={1} 
							/>
						</div>
						: null
					}
				</div>
				<div 
					className={styles['alibis-holder']}
					style={{
						top: (clientHeight - 450) / 2 - 104
					}}
				>
					{opponent.alibis.map((id, i) => {
						return <Card
									id={id}
									display={(isPhantom || id === 17) ? 1 : -1}
									key={i}
							 	/>
					})}
				</div>
				<div 
					className={styles['alibis-holder']}
					style={{
						top: (clientHeight + 450) / 2 + 20
					}}
				>
					{myself.alibis.map((id, i) => {
						return <Card
									id={id}
									display={(isPhantom || id === 17) ? 1 : -1}
									key={i}
							 	/>
					})}
				</div>
				<Score
					visible={phase === 'game'}
					winner={winner}
					users={users}
					watch={watch}
					onConfirm={this.handleConfirmGame}
				/>
				<CardViewer />
				<Log logs={logs} users={users} height={clientHeight - 445} />
			</div>
		);
	}

	handlePlayRole(card) {
		const { table, data } = this.props.board;
		socket.emit(`client.poto.${data.phase}`, {
			tableId: table._id,
			cardId: card.id
		});
	}

	handleMove() {
		this.setState({
			action: 'move',
			rooms: poto.move(this.props.board),
			tokens: [],
			corridors: []
		});
	}

	handleEffect() {
		const { board } = this.props;
		switch(board.data.cardId) {
			case 5:
				socket.emit(`client.poto.${board.data.phase}`, {
					tableId: board.table._id,
					action: 'effect'
				});
				break;
			case 3:
			case 4:
			case 6:
			case 7:
			case 8:
				this.setState(poto.effect(board, 'token'));
				break;
		}
	}

	handleEnd() {
		const { table, data } = this.props.board;
		this.setState({
			action: '',
			rooms: [],
			tokens: [],
			corridors: []
		});
		socket.emit(`client.poto.${data.phase}`, {
			tableId: table._id,
			action: 'end'
		});
	}

	handleClickRoom(roomId) {
		const { table, data } = this.props.board;
		const { action, rooms } = this.state;
		if(action === 'move' && rooms.indexOf(roomId) >= 0) {
			socket.emit(`client.poto.${data.phase}`, {
				tableId: table._id,
				roomId,
				action
			});
			this.setState({rooms: []});
		} else if(action === 'effect' && rooms.indexOf(roomId) >= 0) {
			socket.emit(`client.poto.${data.phase}`, {
				tableId: table._id,
				roomId,
				tokenId: this._tokenId,
				action
			});
			this.setState({rooms: []});
		}
	}

	handleClickToken(tokenId) {
		const { table, data } = this.props.board;
		const { action, rooms, tokens } = this.state;
		if(action === 'effect' && tokens.indexOf(tokenId) >= 0) {
			switch(data.cardId) {
			case 6:
			case 8:
				this._tokenId = tokenId;
				this.setState(poto.effect(this.props.board, 'room'));
				break;
			default:
				socket.emit(`client.poto.${data.phase}`, {
					tableId: table._id,
					tokenId,
					action
				});
			}
			this.setState({tokens: []});
		}
	}

	handleClickCorridor(corridorId) {
		const { table, data } = this.props.board;
		const { action, corridors } = this.state;
		if(corridors.indexOf(corridorId) >= 0) {
			socket.emit(`client.poto.${data.phase}`, {
				tableId: table._id,
				corridorId,
				action
			});
			this.setState({corridors: []});
		}
	}

	handleConfirmGame() {
		const { table, data } = this.props.board;
		socket.emit(`client.poto.${data.phase}`, {
			tableId: table._id
		});
		this.props.setBoardVisible(false);
	}
}

function mapStateToProps({ client, board, users, logs }) {
	return {
		clientHeight: client.clientHeight,
		user: client.user,
		board,
		users,
		logs
	};
}

export default connect(mapStateToProps, { setBoardVisible })(POTO);

const roomUI = {
	'1': {left: 250, top: 100, width: 170, height: 70},
	'2': {left: 470, top: 100, width: 160, height: 90},
	'3': {left: 650, top: 220, width: 110, height: 90},
	'4': {left: 630, top: 330, width: 110, height: 80},
	'5': {left: 465, top: 340, width: 140, height: 70},
	'6': {left: 270, top: 340, width: 160, height: 90},
	'7': {left: 70, top: 330, width: 150, height: 90},
	'8': {left: 60, top: 200, width: 150, height: 80},
	'9': {left: 250, top: 220, width: 170, height: 90},
	'10': {left: 470, top: 230, width: 140, height: 80}
};

const corridorUI = {
	'1': {id: 1, left: 430, top: 150},
	'2': {id: 2, left: 615, top: 190},
	'3': {id: 3, left: 740, top: 310},
	'4': {id: 4, left: 610, top: 280},
	'5': {id: 5, left: 600, top: 375},
	'6': {id: 6, left: 430, top: 378},
	'7': {id: 7, left: 220, top: 384},
	'8': {id: 8, left: 180, top: 295},
	'9': {id: 9, left: 215, top: 180},
	'10': {id: 10, left: 215, top: 250},
	'11': {id: 11, left: 430, top: 290}
};