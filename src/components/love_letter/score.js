import React, { Component } from 'react';

import styles from './score.css';

export default class Score extends Component {
	constructor(props) {
		super(props);
		this.handleMouseDown = this.handleMouseDown.bind(this);
	}

	render() {
		const { board, users, phase, watch } = this.props;
		const { players, winner, vp } = board.data;
		if(phase !== 'round' && phase !== 'game') return null;
		return (
			<div className={styles.container}>
				<h2>{`${users[players[winner].id].name} wins the ${phase}!`}</h2>
				<h5>{`${vp} vp wins the game`}</h5>
				<div className={styles.list}>
					{players.map(player => {
						return <div key={player.id}>
									<span>{users[player.id].name}</span>
									<span className={styles.right}>{`${player.vp} vp`}</span>
								</div>
					})}
				</div>
				{!watch ? 
					<div className={styles['btn-holder']}>
						<button 
							className={styles.btn} 
							onMouseDown={this.handleMouseDown}
						>
							{phase === 'round' ? 'Ok' : 'Exit'}
						</button>
					</div> 
					: null
				}
			</div>
		);
	}

	handleMouseDown() {
		const { onConfirm } = this.props;
		if(onConfirm) onConfirm();
	}
};