import React, { Component } from 'react';

import styles from './score.css';

export default class Score extends Component {
	constructor(props) {
		super(props);
		this.handleMouseDown = this.handleMouseDown.bind(this);
	}

	render() {
		const { winner, users, watch } = this.props;
		const isPhantom = winner.phantom;
		return (
			<div className={styles.container}>
				<h2>{`${users[winner.id].name} wins the game!`}</h2>
				<p className={styles.desc}>{isPhantom ? PHANTOM : INVESTIGATOR}</p>
				{!watch ? 
					<div className={styles['btn-holder']}>
						<button 
							className={styles.btn} 
							onMouseDown={this.handleMouseDown}
						>
							Ok
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

const PHANTOM = 'Terried by events and by an investigation that has stalled, La Carlotta leaves the Opéra Garnier. Paris does not deserve her talent! The Phantom wins. Today still, it is said that one can sometimes hear his cavernous laughter in the corridors...';
const INVESTIGATOR = 'The character who tried to pass for a Phantom is immediately arrested by the Investigator. La Carlotta, reassured and grateful to the Parisian authorities, maintains her recital at the Opéra Garnier. The Investigator wins the game.';