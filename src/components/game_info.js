import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';

import Table from './table';
import styles from './game_info.css';

import socket from '../sockets';
import { setGameInfoFolded, setLoginVisible } from '../actions';

class GameInfo extends Component {
	constructor(props) {
		super(props);
		this.handlePlay = this.handlePlay.bind(this);
		this.handleNewGame = this.handleNewGame.bind(this);
	}

	render() {
		const { clientWidth, clientHeight, game, folded, user, tables } = this.props;
		const { name, min_players, max_players, length, weight, rule_url } = game;
		const x = folded === 0 ?
					clientWidth : folded === 1 ?
						 clientWidth - 360 : clientWidth - 720;

		let leftTables = [], rightTables = [];
		if(user) {
			_.each(tables, table => {
				if(table.game === game.id) {
					if(_.includes(table.players, user._id))
						rightTables.push(table);
					else leftTables.push(table);
				}
			});
			leftTables = leftTables.map(table => <Table table={table} game={game} key={table._id} />);
			rightTables = rightTables.map(table => <Table table={table} game={game} key={table._id} />);
		}

		return (
			<Motion style={{x: spring(x)}}>
				{({ x }) => 
					<div 
						className={cx({
							[styles.container]: true,
							[styles.full]: folded === 2
						})}
						style={{
							height: clientHeight,
							transform: `translateX(${x}px)`,
							WebkitTransform: `translateX(${x}px)`
						}}
					>
						<div className={styles.intro}>
							<h1 className={cx(styles.section, styles.m30)}>{name}</h1>
							<h3 className={styles.section}>
								<span className={styles.value}>
									{min_players === max_players ? min_players : `${min_players} - ${max_players}`}
								</span> PLAYERS
							</h3>
							<h3 className={styles.section}>
								<span className={styles.value}>{length}</span> MINUTES
							</h3>
							<h3 className={styles.section}>
								<span className={styles.value}>{weight}</span> / 5 WEIGHT
							</h3>
							<div className={styles.m30}>
								<span className={styles['btn-long']} onMouseDown={this.handlePlay}>
									<strong>PLAY</strong>
								</span>
								<br />
								<a href={rule_url} target='_blank'>How to play</a>
							</div>
						</div>
						<div className={styles.entrance}>
							<div className={styles.left}>
								<div>
									<span 
										className={styles.btn}
										onMouseDown={this.handleNewGame}
									>
										NEW GAME
									</span>
								</div>
								<div>
									{leftTables}
								</div>
							</div>
							<div className={styles.right}>
								{rightTables}
							</div>
						</div>
					</div>
				}
			</Motion>
		);
	}

	handlePlay() {
		const { user, setGameInfoFolded, setLoginVisible } = this.props;
		if(!user) {
			setLoginVisible(true);
		} else {
			setGameInfoFolded(2);
		}
	}

	handleNewGame() {
		const { user, game } = this.props;
		socket.emit('client.table.new', { userId: user._id, gameId: game.id });
	}
}

function mapStateToProps({ client, tables }) {
	return {
		clientWidth: client.clientWidth,
		clientHeight: client.clientHeight,
		folded: client.gameInfo.folded,
		user: client.user,
		tables
	};
}

export default connect(mapStateToProps, { setGameInfoFolded, setLoginVisible })(GameInfo);