import React, { Component } from 'react';

import styles from './game.css';

class Game extends Component {
	render() {
		const { name, players, length, designer, img_url } = this.props.game;
		return (
			<div className={styles.container}
				style={{backgroundImage: `url(${img_url})`}}>
			</div>
		);
	}
};

export default Game;