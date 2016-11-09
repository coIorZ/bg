import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import styles from './love_letter.css';

import { CARDS } from '../../../core/love_letter';

import { setBoardVisible } from '../../actions';

class LoveLetter extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		let a = this.props.board;
		const { clientHeight, board, users } = this.props;
		const { table, data } = board;
		const { deck, players, activePlayer, vp, removedFaceDown, removedFaceUp } = data;

		return (
			<div className={styles.container}
				style={{height: clientHeight}}>
				<div>winning condition: {vp}vp</div>
				<div>Deck {`(${deck.length})`}</div>
				<div>removedFaceDown (1)</div>
				{removedFaceUp.length ? <div>removedFaceUp (3): {_.map(removedFaceUp, id => 
											<span key={id}>{CARDS[id].name}({CARDS[id].value})&nbsp;&nbsp;</span>
										)}</div> : null}
				<div>it's {`${users[activePlayer].name}'s turn`}</div>
				{players.map(player => {
					return (
						<div key={player.player}>
							<div>{users[player.player].name}&nbsp;&nbsp; vp: {player.vp}</div>
							<div>hands: 
								{player.hands.map(hand => {
									return <span key={hand}>{CARDS[hand].name}({CARDS[hand].value})&nbsp;&nbsp;</span>
								})}
							</div>
						</div>
					);
				})}
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