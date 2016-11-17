import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';

import LoveLetter from './love_letter/love_letter';
import Coup from './coup/coup';
import styles from './board.css';

import { GAME_LOVE_LETTER, GAME_COUP, GAME_TNL, GAME_INNOVATION } from '../../core';

import { setBoardVisible } from '../actions';

class Board extends Component {
	render() {
		const { boardVisible, gameId, games, clientHeight } = this.props;
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
			<div 
				className={cx({
					[styles.container]: true,
					[styles.active]: boardVisible
				})}
				style={{height: clientHeight}}
			>
				<div className={styles.mask}>
					<div 
						className={styles['mask-bg']}
						style={{backgroundImage: `url(${_.find(games, game => game.id === gameId).img_url})`}}
					>
					</div>
					<div className={styles['mask-mask']}></div>
				</div>
				{gameBoard}
				<button 
					className={styles.btn}
					onClick={() => this.props.setBoardVisible(false)}
				>
					back
				</button>
			</div>
		);
	}
}

function mapStateToProps({ client, games }) {
	return {
		boardVisible: client.boardVisible,
		clientHeight: client.clientHeight,
		games
	};
}

export default connect(mapStateToProps, { setBoardVisible })(Board);
