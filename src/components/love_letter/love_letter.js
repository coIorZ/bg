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
				<div>winning condition: {vp}vp</div>
				<Deck deck={deck} />
				<div className={styles.area}>
					<div className={styles.label}>Removed</div>
					<Card card={CARDS[removedFaceDown]} display={0} />
					{removedFaceUp.length ? _.map(removedFaceUp, id => <Card card={CARDS[id]} display={1} key={id} />) 
										: null}
				</div>
				
				<div>it's {`${users[players[activePlayer].id].name}'s turn`}</div>
				{players.map(player => {
					return (
						<div key={player.id} style={{marginTop: 20, marginBottom: 20}}>
							<div>{users[player.id].name}</div>
							<div>vp: {player.vp}</div>
							<div>hands: 
								{player.hands.map(hand => {
									const display = player.id === user._id ? 1 : 0;
									const playable = player.id === user._id;
									return <Card card={CARDS[hand]} display={display} playable={player} key={hand} />
								})}
							</div>
						</div>
					);
				})}

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