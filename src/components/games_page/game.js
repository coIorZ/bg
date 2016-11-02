import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import styles from './game.css';

class Game extends Component {
	constructor(props) {
		super(props);
	}

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