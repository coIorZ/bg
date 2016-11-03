import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';

import styles from './game_info.css';

import { setGameInfoFolded } from '../../actions';

class GameInfo extends Component {
	render() {
		const { clientWidth, clientHeight, game, folded } = this.props;
		const { name, players, length, weight } = game;
		const x = folded === 0 ?
					clientWidth : folded === 1 ?
						 clientWidth - 360 : clientWidth - 720;

		return (
			<Motion style={{x: spring(x)}}>
			{({ x }) => 
				<div className={styles.container}
					style={{
						height: clientHeight,
						transform: `translateX(${x}px)`
					}}>
					<div className={styles.intro}>
						<p className={styles.name}>{name}</p>
						<p>
							<span className={styles.btn}
								onClick={() => this.props.setGameInfoFolded(2)}>Play</span>
						</p>
					</div>
				</div>
			}
			</Motion>
		);
	}
}

function mapStateToProps({ appearance, gamesPage }) {
	return {
		clientWidth: appearance.clientWidth,
		clientHeight: appearance.clientHeight,
		folded: gamesPage.folded
	};
}

export default connect(mapStateToProps, { setGameInfoFolded })(GameInfo);