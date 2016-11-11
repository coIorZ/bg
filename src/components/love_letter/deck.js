import React, { Component } from 'react';

import styles from './deck.css';

export default class Deck extends Component {
	render() {
		const { deck } = this.props;
		return (
			<div className={styles.card}>
				<span className={styles.text}>Deck</span>
				<img src={'./img/love_letter/back.jpg'} className={styles.bg} />
				<div className={styles.counter}>Deck ({deck.length})</div>
			</div>
		);
	}
};