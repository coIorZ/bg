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
		const { table, users, user, games, game, language } = this.props;
		const { host, players, status } = table;
		const { min_players, max_players } = game;
		const started = status === 1;
		const onTable = _.includes(players, user._id);
		const tableSize = _.size(players);
		const joinable = tableSize < max_players;
		const playable = tableSize >= min_players;
		let joinBtn = null, leaveBtn = null, startBtn = null, watchBtn = null, rejoinBtn = null;
		joinBtn = !onTable && !started && joinable
				&& <span className={cx(styles.btn, styles.green)} key={0} onMouseDown={this.joinTable}>{language === 'ch' ? '加入' : 'JOIN'}</span>;
		leaveBtn = onTable && !started
				&& <span className={cx(styles.btn, styles.red)} key={1} onMouseDown={this.leaveTable}>{language === 'ch' ? '退出' : 'LEAVE'}</span>;
		startBtn = onTable && !started && playable && (host === user._id)
				&& <span className={cx(styles.btn, styles.blue)} key={2} onMouseDown={this.startTable}>{language === 'ch' ? '开始' : 'START'}</span>;
		watchBtn = !onTable && started
				&& <span className={cx(styles.btn, styles.orange)} key={3} onMouseDown={this.rejoinTable}>{language === 'ch' ? '观战' : 'WATCH'}</span>;
		rejoinBtn = onTable && started
				&& <span className={cx(styles.btn, styles.blue)} key={4} onMouseDown={this.rejoinTable}>{language === 'ch' ? '重连' : 'REJOIN'}</span>;

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
					{_.map(players, player => {
						return <div key={player}>
							<span
								className={cx({
									[styles.status]: true,
									[styles.online]: users[player].online
								})}>
							</span> {users[player].name}
						</div>
					})}
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
		if(table.game !== '1' && table.game !== '2') {
			notify({message: {
				en: 'this game is still in progress',
				ch: '该游戏还在开发中'
			}});
			return;
		}
		socket.emit('client.table.start', table);
	}

	rejoinTable() {
		const { table } = this.props;
		socket.emit('client.board.reconnect', table._id);
	}
}

function mapStateToPros({ client, users, games }) {
	return {
		user: client.user,
		language: client.language,
		users,
		games
	};
}

export default connect(mapStateToPros, { notify })(Table);