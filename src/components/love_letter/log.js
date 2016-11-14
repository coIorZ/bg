import React, { Component } from 'react';

import Card from './card';
import styles from './log.css';

import { CARDS } from '../../../core/love_letter';

export default class Log extends Component {
	componentDidUpdate() {
		this.refs.container.scrollTop = this.refs.container.scrollHeight;
	}

	render() {
		const { logs, users, height } = this.props;
		return (
			<div className={styles.container}
				style={{ height }}
				ref='container'>
				{logs.map((log, i) => {
					log = log.replace(/\|p:(\w+)\|/g, (s, id) => {
						return users[id].name;
					});
					let pieces = log.split('|');
					return <div key={i}>
						{pieces.map((piece, j) => {
							let str = null;
							if(str = piece.match(/^c:(\w+)/)) {
								let id = str[1];
								return <Card card={CARDS[id]} display={2} key={j} />;
							} else {
								return <span key={j}>{piece}</span>
							}
						})}
					</div>
				})}
			</div>
		);
	}
};