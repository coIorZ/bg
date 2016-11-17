import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';

import styles from './table.css';

import socket from '../sockets';
import { notify } from '../actions';

class Table extends Component {
	constructor(props) {
		super(props);
		this.joinTable = this.joinTable.bind(this);
		this.leaveTable = this.leaveTable.bind(this);
		this.startTable = this.startTable.bind(this);
		this.rejoinTable = this.rejoinTable.bind(this);
	}

	render() {
		const { table, users, user, games, game } = this.props;
		const { host, players, started } = table;
		const { min_players, max_players } = game;

		const onTable = _.includes(players, user._id);
		const tableSize = _.size(players);
		const joinable = tableSize < max_players;
		const playable = tableSize >= min_players;
		let joinBtn = null, leaveBtn = null, startBtn = null, watchBtn = null, rejoinBtn = null;
		joinBtn = !onTable && !started && joinable
				&& <span className={cx(styles.btn, styles.green)} key={0} onMouseDown={this.joinTable}>JOIN</span>;
		leaveBtn = onTable && !started
				&& <span className={cx(styles.btn, styles.red)} key={1} onMouseDown={this.leaveTable}>LEAVE</span>;
		startBtn = onTable && !started && playable && (host === user._id)
				&& <span className={cx(styles.btn, styles.blue)} key={2} onMouseDown={this.startTable}>START</span>;
		watchBtn = !onTable && started
				&& <span className={cx(styles.btn, styles.orange)} key={3} onMouseDown={this.rejoinTable}>WATCH</span>;
		rejoinBtn = onTable && started
				&& <span className={cx(styles.btn, styles.blue)} key={4} onMouseDown={this.rejoinTable}>REJOIN</span>;

		return (
			<div className={styles.container}>
				<div 
					className={cx({
						[styles.header]: true,
						[styles.started]: started
					})}
				>
					{`${users[host].name}'s game`}
				</div>
				<div className={styles.body}>
					{_.map(players, player => <div key={player}>{users[player].name}</div>)}
					<div className={styles['btn-group']}>
						{startBtn}
						{rejoinBtn}
						{joinBtn}
						{leaveBtn}
						{watchBtn}
					</div>
				</div>
			</div>
		);
	}

	joinTable() {
		const { table, user } = this.props;
		socket.emit('client.table.join', {
			tableId: table._id,
			userId: user._id
		});
	}

	leaveTable() {
		const { table, user } = this.props;
		const { _id, players } = table;
		if(_.size(players) === 1) {
			socket.emit('client.table.remove', _id);
		} else {
			socket.emit('client.table.leave', {
				tableId: _id,
				userId: user._id
			});
		}
	}

	startTable() {
		const { table, notify } = this.props;
		if(table.game !== '1') {
			notify({message: 'this game is still in progress'});
			return;
		}
		socket.emit('client.table.start', table);
	}

	rejoinTable() {
		const { table } = this.props;
		socket.emit('client.table.board', table._id);
	}
}

function mapStateToPros({ client, users, games }) {
	return {
		user: client.user,
		users,
		games
	};
}

export default connect(mapStateToPros, { notify })(Table);