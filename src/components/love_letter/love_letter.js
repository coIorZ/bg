import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Card from './card';
import Player from './player';
import CardViewer from '../card_viewer';
import styles from './love_letter.css';

import { CARDS } from '../../../core/love_letter';

import { setBoardVisible } from '../../actions';

class LoveLetter extends Component {
	constructor(props) {
		super(props);
		this.handlePlayCard = this.handlePlayCard.bind(this);
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
						{removedFaceUp.length ? _.map(removedFaceUp, (id, i) => <Card card={CARDS[id]} display={1} key={i} />) 
											: null}
					</div>
				</div>
				<div className={styles['others-holder']}>
					{players.map((player, i) => {
						if(player.id === user._id) return null;
						return (
							<Player player={player} 
								user={user} 
								users={users} 
								active={activePlayer === i} 
								key={player.id} /> 
						);
					})}
				</div>
				<div className={styles['me-holder']} >
					<Player player={_.find(players, player => player.id === user._id)} 
						user={user} 
						users={users} 
						active={players[activePlayer].id === user._id}/> 
				</div>
				<div className={styles['hands-holder']}>
					{_.find(players, player => player.id === user._id).hands.map((id, i) => {
						const playable = players[activePlayer].id === user._id;
						return <Card card={CARDS[id]} display={1} playable={playable} key={i}
									onMouseDown={this.handlePlayCard} />
					})}
				</div>

				<CardViewer />
			</div>
		);
	}

	handlePlayCard(card) {
		
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