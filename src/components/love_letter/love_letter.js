import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Card from './card';
import Player from './player';
import CardList from './card_list';
import Score from './score';
import Log from './log';
import CardViewer from '../card_viewer';
import styles from './love_letter.css';

import { send } from '../../sockets';
import { CARDS } from '../../../core/love_letter';

import { setBoardVisible, notify } from '../../actions';

class LoveLetter extends Component {
	constructor(props) {
		super(props);
		this.playCard = this.playCard.bind(this);
		this.choosePlayer = this.choosePlayer.bind(this);
		this.chooseNonGuardCard = this.chooseNonGuardCard.bind(this);
		this.handleRevealHandsConfirm = this.handleRevealHandsConfirm.bind(this);
		this.handleConfirmScore = this.handleConfirmScore.bind(this);
	}

	render() {
		const { clientHeight, board, users, user, logs } = this.props;
		const { table, data } = board;
		const { deck, players, activePlayer, vp, removedFaceDown, removedFaceUp, phase, cardId, effect } = data;
		const myTurn = players[activePlayer].id === user._id;
		const myself = _.find(players, player => player.id === user._id);

		return (
			<div 
				className={styles.container}
				style={{height: clientHeight}}
			>
				<div className={styles['deck-holder']}>
					<div className={styles.holder} style={{marginRight: 40}}>
						<div className={styles.label}>Deck({deck.length})</div>
						<Card display={0} />
					</div>
					<div className={styles.holder}>
						<div className={styles.label}>Removed</div>
						{removedFaceDown ?
							<Card display={0} />
							: null
						}
						{removedFaceUp.length ? 
							_.map(removedFaceUp, (id, i) => <Card card={CARDS[id]} display={1} key={i} />) 
							: null
						}
					</div>
				</div>
				<div className={styles['others-holder']}>
					{players.map((player, i) => {
						if(player.id === user._id) return null;
						const selected = phase === 'effect' && effect === player.id;
						return (
							<Player 
								player={player} 
								user={user} 
								users={users} 
								active={activePlayer === i} 
								selectable={phase === 'choose.player' && myTurn}
								selected={selected}
								revealHands={(selected && cardId === 2) || phase === 'round' || !myself}
								confirmBtn={selected && cardId === 2 && myself}
								out={player.out}
								onConfirm={this.handleRevealHandsConfirm}
								key={player.id}
								onMouseDown={this.choosePlayer} 
							/> 
						);
					})}
				</div>
				{myself ? 
					<div className={styles['me-holder']} >
						<Player 
							player={myself} 
							user={user} 
							users={users} 
							active={myTurn}
							selectable={phase === 'choose.player' && cardId === 5 && myTurn}
							selected={phase === 'effect' && effect === user._id}
							out={myself.out}
							onMouseDown={this.choosePlayer}
						/> 
					</div> 
					: null
				}
				{myself ? 
					<div className={styles['hands-holder']}>
						{myself.hands.map((id, i) => {
							const playable = myTurn && phase === 'play.card';
							return <Card 
										card={CARDS[id]} 
										display={1} 
										playable={playable} 
										key={i}
										onMouseDown={this.playCard} 
									/>
						})}
					</div> 
					: null
				}
				<CardList 
					visible={phase === 'effect' && cardId === 1 && myTurn}
					onMouseDown={this.chooseNonGuardCard} 
				/>
				<Score 
					board={board} 
					users={users} 
					phase={phase} 
					watch={!myself}
					onConfirm={this.handleConfirmScore} 
				/>
				<CardViewer />
				<Log logs={logs} users={users} height={clientHeight - 445} />
			</div>
		);
	}

	playCard(card) {
		const { table, data } = this.props.board;
		const hands = data.players[data.activePlayer].hands;
		if(_.includes(hands, 7) && (card.id === 5 || card.id === 6)) {
			this.props.notify({message: 'you must play Countess'});
			return;
		}
		send(`client.loveletter.${data.phase}`, {
			tableId: table._id,
			cardId: card.id
		});
	}

	choosePlayer(player) {
		const { table, data } = this.props.board;
		send(`client.loveletter.${data.phase}`, {
			tableId: table._id,
			playerId: player.id
		});
	}

	chooseNonGuardCard(card) {
		const { table, data } = this.props.board;
		this.setState({cardListVisible: false});
		send(`client.loveletter.${data.phase}`, {
			tableId: table._id,
			cardId: card.id
		});
	}

	handleRevealHandsConfirm() {
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
			this.props.setBoardVisible(false);
		}
	}
}

function mapStateToProps({ client, board, users, logs }) {
	return {
		clientHeight: client.clientHeight,
		user: client.user,
		users,
		board,
		logs
	};
}

export default connect(mapStateToProps, { setBoardVisible, notify })(LoveLetter);