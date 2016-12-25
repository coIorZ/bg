import React, { Component } from 'react';

import Card from './card';
import styles from './log.css';

export default class Log extends Component {
	componentDidUpdate() {
		this.refs.container.scrollTop = this.refs.container.scrollHeight;
	}

	render() {
		const { logs, users, language } = this.props;
		return (
			<div 
				className={styles.container}
				ref='container'
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				{logs.map((log, i) => {
					log = log[language].replace(/\|p:(\w+)\|/g, (s, id) => {
						return users[id].name;
					});
					let pieces = log.split('|');
					return <div className={styles.line} key={i}>
								{pieces.map((piece, j) => {
									let str = null;
									if(str = piece.match(/^c:(\w+)/)) {
										let id = str[1];
										return <Card id={id} display={-1} key={j} />;
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