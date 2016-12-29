import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import cx from 'classnames';
import _ from 'lodash';

import Card from './card';
import Player from './player';
import Actions from './actions';
import Score from './score';
import Log from './log';
import CardViewer from '../card_viewer';
import styles from './phantom_of_the_opera.css';

import { send } from '../../sockets';
import poto, { CARDS, TOKENS } from '../../../core/phantom_of_the_opera';
import { setTable } from '../../actions';

class POTO extends Component {
	constructor(props) {
		super(props);
		this.handlePlayRole = this.handlePlayRole.bind(this);
		this.handleMove = this.handleMove.bind(this);
		this.handleEffect = this.handleEffect.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
		this.handleConfirmGame = this.handleConfirmGame.bind(this);
		this.handleClickToken = this.handleClickToken.bind(this);
		this.handleShowLog = this.handleShowLog.bind(this);
		this.handleHideLog = this.handleHideLog.bind(this);
		this.handleExit = this.handleExit.bind(this);
		this.handleRule = this.handleRule.bind(this);
		this.state = {
			logX: props.clientWidth - 10,
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
		const { clientHeight, clientWidth, board, user, users, logs, language } = this.props;
		const { table, data } = board;
		const { deck, alibis, turn, laCarlotta, exit, lock, rooms, roles, investigator, phantom, actions, phase, winner } = data;
		const isPhantom = phantom.id === user._id;
		const myself = user._id === phantom.id ? phantom
						: user._id === investigator.id ? investigator
							: null;
		const myTurn = (myself === phantom && !turn) || (myself === investigator && turn);
		return (
			<div 
				className={styles.container}
				style={{height: clientHeight}}
			>
				<div className={styles['players-area']}>
					<div className={styles['menu-section']}>
						<div 
							className={styles.icon}
							onMouseDown={this.handleExit}
						>
							<img src='./img/exit.png' />
							<img src='./img/exit_active.png' className={styles.active} />
						</div>
						<div 
							className={styles.icon}
							onMouseDown={this.handleRule}
						>
							<img src='./img/idea.png' />
							<img src='./img/idea_active.png' className={styles.active} />
						</div>
					</div>
					<Player player={investigator} users={users} user={user} data={data} language={language} />
					<Player player={phantom} users={users} user={user} data={data} language={language} />
				</div>
				<div 
					className={styles['main-area']}
					style={{
						width: clientWidth - 320,
						height: clientHeight - 130
					}}
				>
					<div 
						className={styles['main-section']}
						style={{
							top: (clientHeight / 2 - 401) < 0 ? 0 : clientHeight / 2 - 401
						}}
					>
						<div className={styles['board-holder']}>
							<img src='./img/phantom_of_the_opera/board.jpg' className={styles['board-img']} />
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
													[styles.playable]: myTurn && this.state.rooms.indexOf(room.id) >= 0
												})}
												onMouseDown={this.handleClickRoom.bind(this, room.id)}
											>
												{room.id}
											</div>
											{room.tokens.map(token => {
												return <Card 
															id={token} 
															display={1} 
															playable={myTurn && this.state.tokens.indexOf(token) >= 0}
															onMouseDown={this.handleClickToken.bind(this)}
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
												[styles.playable]: myTurn && this.state.corridors.indexOf(corridor.id) >= 0
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
							<div 
								className={styles.la}
								style={{
									left: 44.2 * (laCarlotta - 1) + 15
								}}
							>
								<img src='./img/phantom_of_the_opera/la.jpg' className={styles['la-img']} />
							</div>
						</div>
						<div className={styles['deck-holder']}>
							<div>
								<Card id={-1} label={`Deck(${deck.length})`} />
							</div>
							<div>
								<Card id={-2} label={`Alibis(${alibis.length})`} />
							</div>
						</div>
					</div>
					{myTurn && phase === 'choose.action' ?
						<div 
							className={styles['action-section']}
							style={{
								width: clientWidth - 320
							}}
						>
							<Actions 
								actions={actions} 
								onClickMove={this.handleMove}
								onClickEffect={this.handleEffect}
								onClickEnd={this.handleEnd}
							/>
						</div>
						: null
					}
				</div>
				<div 
					className={styles['hands-area']}
					style={{
						width: clientWidth - 320
					}}
				>
					{roles.map(role => {
						return <Card 
									id={role.id} 
									playable={myTurn && phase === 'play.card' && role.available}
									unavailable={!role.available}
									mr={4}
									key={role.id}
									onMouseDown={this.handlePlayRole}
								/>
					})}
				</div>
				<Motion style={{x: spring(this.state.logX)}}>
					{({ x }) =>
						<div 
							className={styles['log-area']}
							style={{
								transform: `translateX(${x}px)`,
								WebkitTransform: `translateX(${x}px)`
							}}
							onMouseEnter={this.handleShowLog}
							onMouseLeave={this.handleHideLog}
						>
							<Log logs={logs} users={users} language={language} />
						</div>
					}
				</Motion>
				<CardViewer />
				<Score
					visible={phase === 'game'}
					winner={winner}
					users={users}
					watch={!myself}
					onConfirm={this.handleConfirmGame}
				/>
			</div>
		);
	}

	handleExit() {
		const { table, setTable } = this.props;
		send('client.board.leave', table._id);
		setTable(null);
	}

	handleRule() {

	}

	handleShowLog() {
		this.setState({logX: this.props.clientWidth - 500});
	}

	handleHideLog() {
		this.setState({logX: this.props.clientWidth - 10});
	}

	handlePlayRole(id) {
		const { table, data } = this.props.board;
		send(`client.poto.${data.phase}`, {
			tableId: table._id,
			cardId: id
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
				send(`client.poto.${board.data.phase}`, {
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
		send(`client.poto.${data.phase}`, {
			tableId: table._id,
			action: 'end'
		});
	}

	handleClickRoom(roomId) {
		const { table, data } = this.props.board;
		const { action, rooms } = this.state;
		if(action === 'move' && rooms.indexOf(roomId) >= 0) {
			send(`client.poto.${data.phase}`, {
				tableId: table._id,
				roomId,
				action
			});
			this.setState({rooms: []});
		} else if(action === 'effect' && rooms.indexOf(roomId) >= 0) {
			send(`client.poto.${data.phase}`, {
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
				send(`client.poto.${data.phase}`, {
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
			send(`client.poto.${data.phase}`, {
				tableId: table._id,
				corridorId,
				action
			});
			this.setState({corridors: []});
		}
	}

	handleConfirmGame() {
		const { table, data } = this.props.board;
		send(`client.poto.${data.phase}`, {
			tableId: table._id
		});
		this.props.setBoardVisible(false);
	}
}

function mapStateToProps({ client, board, users, logs }) {
	return {
		clientHeight: client.clientHeight,
		clientWidth: client.clientWidth,
		table: client.table,
		language: client.language,
		user: client.user,
		board,
		users,
		logs
	};
}

export default connect(mapStateToProps, { setTable })(POTO);

const roomUI = {
	'1': {left: 310, top: 115, width: 216, height: 100},
	'2': {left: 580, top: 90, width: 170, height: 162},
	'3': {left: 800, top: 280, width: 162, height: 100},
	'4': {left: 780, top: 410, width: 162, height: 80},
	'5': {left: 580, top: 420, width: 162, height: 70},
	'6': {left: 360, top: 430, width: 162, height: 90},
	'7': {left: 110, top: 420, width: 162, height: 90},
	'8': {left: 100, top: 250, width: 162, height: 80},
	'9': {left: 320, top: 270, width: 216, height: 90},
	'10': {left: 590, top: 290, width: 162, height: 80}
};

const corridorUI = {
	'1': {id: 1, left: 535, top: 175},
	'2': {id: 2, left: 760, top: 230},
	'3': {id: 3, left: 910, top: 375},
	'4': {id: 4, left: 755, top: 345},
	'5': {id: 5, left: 740, top: 460},
	'6': {id: 6, left: 535, top: 470},
	'7': {id: 7, left: 285, top: 470},
	'8': {id: 8, left: 240, top: 365},
	'9': {id: 9, left: 265, top: 210},
	'10': {id: 10, left: 275, top: 305},
	'11': {id: 11, left: 540, top: 360}
};