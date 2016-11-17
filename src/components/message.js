import React, { Component } from 'react';

import styles from './message.css';

export default class Message extends Component {
	render() {
		const { message, users } = this.props;
		return (
			<div className={styles.container}>
				<div>
					<span className={styles.head}>{users[message.user].name}</span>
					<span>{this.getDateString(message.date)}</span>
				</div>
				<div className={styles.message}>
					{message.message}
				</div>
			</div>
		);
	}

	getDateString(ms) {
		const date = new Date(ms);
		return `${date.toLocaleDateString()} - ${date.toTimeString().match(/^\d+:\d+/)[0]}`;
	}
};