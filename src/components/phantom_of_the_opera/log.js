import React, { Component } from 'react';

import Card from './card';
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
									let str, id;
									if(str = piece.match(/^c:(\w+)/)) {
										id = str[1];
										return <Card id={id} display={2} key={j} />;
									} else if(piece.match(/^hr:/)) {
										return <div className={styles.seperator} key={j}></div>;
									} else if(str = piece.match(/^r:(\w+)/)) {
										id = str[1];
										return <div className={styles.room} key={j}>{id}</div>;
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