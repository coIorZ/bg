import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Card from './card';
import Deck from './deck';
import CardViewer from '../card_viewer';
import styles from './love_letter.css';

import { CARDS } from '../../../core/love_letter';

import { setBoardVisible } from '../../actions';

class LoveLetter extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		let a = this.props.board;
		const { clientHeight, board, users, user } = this.props;
		const { table, data } = board;
		const { deck, players, activePlayer, vp, removedFaceDown, removedFaceUp } = data;

		return (
			<div className={styles.container}
				style={{height: clientHeight}}>
				<div className={styles['deck-holder']}>
					<div className={styles.area}
						style={{marginRight: 10}}>
						<div className={styles.label}>Deck({deck.length})</div>
						<Card display={0} />
					</div>
					<div className={styles.area}>
						<div className={styles.label}>Removed</div>
						<Card display={0} />
						{removedFaceUp.length ? _.map(removedFaceUp, id => <Card card={CARDS[id]} display={1} key={id} />) 
											: null}
					</div>
				</div>
				{players.map((player, i) => {
					return (
						<div className={cx({
								[styles.area]: true,
								[styles.player]: true,
								[styles.active]: i === activePlayer,
								[styles.user]: player.id === user._id
							})}
							style={{top: player.id === user._id ? 'auto' : 155 * i + 10}}
							key={player.id}>
							<div>{users[player.id].name}</div>
							<div>vp: {player.vp}</div>
							<div>
								{player.discarded.map(id => {
									return <Card card={CARDS[id]} display={1} key={id} />
								})}
							</div>
						</div>
					);
				})}
				<div className={styles.hands}>
					{_.find(players, player => player.id === user._id).hands.map(id => {
						const playable = players[activePlayer].id === user._id;
						return <Card card={CARDS[id]} display={1} playable={playable} key={id} />
					})}
				</div>

				<CardViewer />
			</div>
		);
	}
}

function mapStateToProps({ client, board, users }) {
	return {
		clientHeight: client.clientHeight,
		user: client.user,
		users,
		board
	};
}

export default connect(mapStateToProps, { setBoardVisible })(LoveLetter);