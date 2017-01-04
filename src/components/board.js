import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import LoveLetter from './love_letter/love_letter';
import POTO from './phantom_of_the_opera/phantom_of_the_opera';
import styles from './board.css';

import { GAME_LOVE_LETTER, GAME_PHANTOM_OF_THE_OPERA } from '../../core';

class Board extends Component {
	render() {
		const { table, clientHeight } = this.props;
		if(!table) {
			return null
		}
		let gameBoard = null;
		switch(table.game) {
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
					[styles.active]: table
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
			</div>
		);
	}
}

function mapStateToProps({ client }) {
	return {
		table: client.table,
		clientHeight: client.clientHeight
	};
}

export default connect(mapStateToProps, null)(Board);
