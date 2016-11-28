import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';

import LoveLetter from './love_letter/love_letter';
import POTO from './phantom_of_the_opera/phantom_of_the_opera';
import styles from './board.css';

import socket from '../sockets';
import { GAME_LOVE_LETTER, GAME_PHANTOM_OF_THE_OPERA } from '../../core';
import { setBoardVisible } from '../actions';

class Board extends Component {
	constructor(props) {
		super(props);
		this.handleback = this.handleback.bind(this);
	}

	render() {
		const { boardVisible, clientHeight } = this.props;
		if(!boardVisible) {
			return null
		}
		let gameBoard = null;
		switch(boardVisible) {
		case GAME_LOVE_LETTER:
			gameBoard = <LoveLetter />;
			break;
		case GAME_PHANTOM_OF_THE_OPERA:
			gameBoard = <POTO />;
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
						style={{backgroundImage: `url(./img/board.jpg)`}}
					>
					</div>
					<div className={styles['mask-mask']}></div>
				</div>
				{gameBoard}
				<button 
					className={styles.btn}
					onMouseDown={this.handleback}
				>
					back
				</button>
			</div>
		);
	}

	handleback() {
		const { board, setBoardVisible } = this.props;
		setBoardVisible(false);
		socket.emit('client.board.leave', board.table._id);
	}
}

function mapStateToProps({ client, board }) {
	return {
		boardVisible: client.boardVisible,
		clientHeight: client.clientHeight,
		board
	};
}

export default connect(mapStateToProps, { setBoardVisible })(Board);
