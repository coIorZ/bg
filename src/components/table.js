import React, { Component } from 'react';
import cx from 'classnames';

import styles from './table.css';

import socket from '../sockets';

class Table extends Component {
	constructor(props) {
		super(props);
		this.joinTable = this.joinTable.bind(this);
		this.leaveTable = this.leaveTable.bind(this);
		this.startTable = this.startTable.bind(this);
	}

	render() {
		const { table, user } = this.props;
		const { host, game, players } = table;

		let btns = [];
		if(!_.some(players, player => player._id === user._id)) {
			btns.push(<span className={cx(styles.btn, styles.green)}
							key={0}
							onMouseDown={this.joinTable}>JOIN</span>);
		} else {
			btns.push(<span className={cx(styles.btn, styles.red)}
							key={1}
							onMouseDown={this.leaveTable}>LEAVE</span>);
			if(user._id === host._id)
				btns.push(<span className={cx(styles.btn, styles.blue)}
								key={2}
								onMouseDown={this.startTable}>START</span>);
		}

		return (
			<div className={styles.container}>
				<div className={styles.header}>{`${host.name}'s game`}</div>
				<div className={styles.body}>
					{players.map(player => <div key={player._id}>{player.name}</div>)}
					<div className={styles['btn-group']}>
						{btns}
					</div>
				</div>
			</div>
		);
	}

	joinTable() {
		const { table, user } = this.props;
		socket.emit('client.table.join', {
			id: table._id,
			user
		});
	}

	leaveTable() {

	}

	startTable() {

	}
}

export default Table;