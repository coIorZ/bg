import React, { Component } from 'react';

import styles from './log.css';

import { CARDS } from '../../../core/phantom_of_the_opera';

export default class Log extends Component {
	componentDidUpdate() {
		this.refs.container.scrollTop = this.refs.container.scrollHeight;
	}

	render() {
		const { logs, users, height } = this.props;
		return (
			<div 
				className={styles.container}
				style={{ height }}
				ref='container'
			>
				{logs.map((log, i) => {
					log = log.replace(/\|p:(\w+)\|/g, (s, id) => {
						return users[id].name;
					});
					let pieces = log.split('|');
					return <div className={styles.line} key={i}>
								{pieces.map((piece, j) => {
									let str = null;
									if(str = piece.match(/^c:(\w+)/)) {
										let id = str[1];
										return <Card card={CARDS[id]} display={2} key={j} />;
									} else if(piece.match(/^hr:/)) {
										return <div className={styles.seperator} key={j}></div>;
									} else {
										return <span key={j}>{piece}</span>;
									}
								})}
							</div>
				})}
			</div>
		);
	}
};