import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import cx from 'classnames';

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
				<div className={cx({
						[styles.container]: true,
						[styles.full]: folded === 2
					})}
					style={{
						height: clientHeight,
						transform: `translateX(${x}px)`
					}}>
					<div className={styles.intro}>
						<h1 className={cx(styles.section, styles.name)}>{name}</h1>
						<h2 className={styles.section}>{players} Players</h2>
						<h2 className={styles.section}>{length} Minutes</h2>
						<h2 className={styles.section}>{weight} / 5 Weight</h2>
						<div className={styles.section}>
							<span className={styles['btn-long']}
								onClick={() => this.props.setGameInfoFolded(2)}>Play</span>
						</div>
					</div>
					<div className={styles.entrance}>
						<div className={styles.left}>
							<div>
								<span className={styles.btn}>New Game</span>
							</div>
						</div>
						<div className={styles.right}></div>
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