import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import cx from 'classnames';

import Card from './card';
import Player from './player';
import Score from './score';
import Log from './log';
import CardViewer from '../card_viewer';
import styles from './love_letter.css';

import { send } from '../../sockets';

import { setBoardVisible, notify } from '../../actions';

class LoveLetter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logX: props.clientWidth - 10,
			scoreVisible: true
		};
		this.playCard = this.playCard.bind(this);
		this.choosePlayer = this.choosePlayer.bind(this);
		this.chooseNonGuardCard = this.chooseNonGuardCard.bind(this);
		this.handleConfirmScore = this.handleConfirmScore.bind(this);
		this.handleShowLog = this.handleShowLog.bind(this);
		this.handleHideLog = this.handleHideLog.bind(this);
		this.handleConfirmReveal = this.handleConfirmReveal.bind(this);
	}

	render() {
		const { clientHeight, clientWidth, board, users, user, logs, language } = this.props;
		const { table, data } = board;
		const { deck, players, activePlayer, vp, removedFaceDown, removedFaceUp, phase, cardId, effect } = data;
		const myTurn = players[activePlayer].id === user._id;
		const myself = _.find(players, player => player.id === user._id);

		return (
			<div 
				className={styles.container}
				style={{height: clientHeight}}
			>
				<div className={styles['players-area']}>
					<div>
						{players.map((player, i) => {
							const selected = phase === 'effect' && effect === player.id;
							return (
								<Player 
									player={player} 
									data={data}
									user={user}
									users={users} 
									key={player.id}
									onMouseDown={this.choosePlayer} 
								/> 
							);
						})}
					</div>
				</div>
				<div 
					className={styles['main-area']}
					style={{
						width: clientWidth - 320,
						height: clientHeight - (myself ? 130 : 0)
					}}
				>
					<div 
						className={styles['cards-section']}
						style={{
							top: clientHeight / 2 - 130
						}}
					>
						<Card id={-1} mr={40} label={`Deck(${deck.length})`} />
						{removedFaceDown ?
							<Card id={-1} mr={4} label='Removed' />
							: null
						}
						{removedFaceUp.length ? 
							_.map(removedFaceUp, (id, i) => <Card id={id} mr={4} key={i} />) 
							: null
						}
					</div>
					{phase === 'effect' && cardId === 2 && myTurn ?
						<div className={styles['reveal-section']}>
							<Card id={_.find(players, player => player.id === effect).hands[0]} />
							<div style={{marginTop: 10, marginBottom: 10}}>
								<span 
									className={styles.btn}
									onMouseDown={this.handleConfirmReveal}
								>
									OK
								</span>
							</div>
						</div>
						: null
					}
					{phase === 'effect' && cardId === 1 && myTurn ?
						<div className={styles['action-section']}>
							<div style={{display: 'inline-block', marginRight: 20}}>Choose a non-guard card: </div>
							{[2,3,4,5,6,7,8].map(id => 
								<Card id={id} playable={1} mr={4} key={id} small={true}
									onMouseDown={this.chooseNonGuardCard} 
								/>
							)}
						</div>
						: null
					}
				</div>
				{myself ? 
					<div 
						className={styles['hands-area']}
						style={{
							width: clientWidth - 320
						}}
					>
						{myself.hands.map((id, i) => {
							const playable = myTurn && phase === 'play.card';
							return <Card 
										id={id} 
										mr={4}
										playable={playable} 
										key={i}
										onMouseDown={this.playCard} 
									/>
						})}
					</div>
					: null
				}
				{(phase === 'round' || phase === 'game') && this.state.scoreVisible ?
					<div className={styles['score-area']}>
						<Score 
							data={data} 
							users={users} 
							watch={!myself}
							onConfirm={this.handleConfirmScore} 
						/>
					</div>
					: null
				}
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
			</div>
		);
	}

	playCard(id) {
		const { table, data } = this.props.board;
		const hands = data.players[data.activePlayer].hands;
		if(_.includes(hands, 7) && (id === 5 || id === 6)) {
			this.props.notify({message: {
				en: 'you have to play Countess',
				ch: '你只能打出Countess'
			}});
			return;
		}
		send(`client.loveletter.${data.phase}`, {
			tableId: table._id,
			cardId: id
		});
	}

	choosePlayer(player) {
		const { table, data } = this.props.board;
		send(`client.loveletter.${data.phase}`, {
			tableId: table._id,
			playerId: player.id
		});
	}

	chooseNonGuardCard(id) {
		const { table, data } = this.props.board;
		this.setState({cardListVisible: false});
		send(`client.loveletter.${data.phase}`, {
			tableId: table._id,
			cardId: id
		});
	}

	handleConfirmReveal() {
		const { table, data } = this.props.board;
		send(`client.loveletter.${data.phase}`, {
			tableId: table._id
		});
	}

	handleConfirmScore() {
		const { table, data } = this.props.board;
		send(`client.loveletter.${data.phase}`, {
			tableId: table._id
		});
		if(data.phase === 'game') {
			this.setState({scoreVisible: false});
		}
	}

	handleShowLog() {
		this.setState({logX: this.props.clientWidth - 500});
	}

	handleHideLog() {
		this.setState({logX: this.props.clientWidth - 10});
	}
}

function mapStateToProps({ client, board, users, logs }) {
	return {
		clientHeight: client.clientHeight,
		clientWidth: client.clientWidth,
		user: client.user,
		language: client.language,
		users,
		board,
		logs
	};
}

export default connect(mapStateToProps, { setBoardVisible, notify })(LoveLetter);