import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import LoveLetter from './love_letter/love_letter';
import Coup from './coup/coup';
import styles from './board.css';

import { GAME_LOVE_LETTER, GAME_COUP, GAME_TNL, GAME_INNOVATION } from '../../core';

import { setBoardVisible } from '../actions';

class Board extends Component {
	render() {
		const { boardVisible, gameId } = this.props;
		if(!boardVisible) {
			return null
		}
		let gameBoard = null;
		switch(gameId) {
		case GAME_LOVE_LETTER:
			gameBoard = <LoveLetter />;
			break;
		}
		return (
			<div className={cx({
				[styles.container]: true,
				[styles.active]: boardVisible
			})}
				style={{}}>
				{gameBoard}
				<button className={styles.back}
					onClick={() => this.props.setBoardVisible(false)}>back</button>
				}
			</div>
		);
	}
}

function mapStateToProps({ client }) {
	return {
		boardVisible: client.boardVisible
	};
}

export default connect(mapStateToProps, { setBoardVisible })(Board);
