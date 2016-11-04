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
						<h3 className={styles.section}><span className={styles.value}>{players}</span> PLAYERS</h3>
						<h3 className={styles.section}><span className={styles.value}>{length}</span> MINUTES</h3>
						<h3 className={styles.section}><span className={styles.value}>{weight}</span> / 5 WEIGHT</h3>
						<div className={styles.section}>
							<span className={styles['btn-long']}
								onClick={() => this.props.setGameInfoFolded(2)}><strong>PLAY</strong></span>
						</div>
					</div>
					<div className={styles.entrance}>
						<div className={styles.left}>
							<div>
								<span className={styles.btn}
									onClick={() => console.log(`${this.props.user} has created a Coup game`)}>NEW GAME</span>
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

function mapStateToProps({ client, gamesPage }) {
	return {
		clientWidth: client.clientWidth,
		clientHeight: client.clientHeight,
		folded: gamesPage.folded,
		user: client.user
	};
}

export default connect(mapStateToProps, { setGameInfoFolded })(GameInfo);