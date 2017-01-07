import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';

import Table from './table';
import styles from './game_info.css';

import socket from '../sockets';
import { setGameInfoFolded, setLoginVisible, notify } from '../actions';

class GameInfo extends Component {
	constructor(props) {
		super(props);
		this.handlePlay = this.handlePlay.bind(this);
		this.handleNewGame = this.handleNewGame.bind(this);
		this.handleCreateGame = this.handleCreateGame.bind(this);
		this.state = {
			new: false,
			title: ''
		};
	}

	render() {
		const { clientWidth, clientHeight, game, folded, user, tables, language } = this.props;
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
								</span> {language === 'ch' ? '人数' : 'PLAYERS'}
							</h3>
							<h3 className={styles.section}>
								<span className={styles.value}>{length}</span> {language === 'ch' ? '分钟' : 'MINUTES'}
							</h3>
							<h3 className={styles.section}>
								<span className={styles.value}>{weight}</span> / 5 {language === 'ch' ? '重度' : 'WEIGHT'}
							</h3>
							<div className={styles.m30}>
								<span className={styles['btn-long']} onMouseDown={this.handlePlay}>
									<strong>{language === 'ch' ? '开始' : 'PLAY'}</strong>
								</span>
								<br />
								<a href={rule_url} target='_blank'>{language === 'ch' ? '游戏规则' : 'How to play'}</a>
							</div>
						</div>
						<div className={styles.entrance}>
							<div className={styles.left}>
								<div>
									<span 
										className={styles.btn}
										onMouseDown={this.handleNewGame}
									>
										{language === 'ch' ? '新建游戏' : 'NEW GAME'}
									</span>
								</div>
								<div>
									{leftTables}
								</div>
							</div>
							<div className={styles.right}>
								{this.state.new ?
									this.buildNew()
									: rightTables
								}
							</div>
						</div>
					</div>
				}
			</Motion>
		);
	}

	buildNew() {
		const { users, user, language } = this.props;
		return (
			<div className={styles.configuration}>
				<div>
					<div
						className={styles.btn}
						style={{marginRight: 30}}
						onMouseDown={this.handleCreateGame}
					>
						{language === 'en' ? 'Create' : '创建'}
					</div>
					<div
						className={cx(styles.btn, styles.red)}
						onMouseDown={() => this.setState({new: false})}
					>
						{language === 'en' ? 'Cancel': '取消'}
					</div>
				</div>
				<div style={{marginTop: 20, marginBottom: 5}}>{language === 'en' ? 'Title' : '房间名'}</div>
				<div>
					<input 
						type='text' 
						value={this.state.title} 
						className={styles.text}
						onChange={(e) => this.setState({title: e.target.value})}
					/>
				</div>
			</div>
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
		const { user, users } = this.props;
		if(!user) {
			setLoginVisible(true);
		} else {
			this.setState({
				new: true,
				title: `${users[user._id].name}'s game`
			});
		}
	}

	handleCreateGame() {
		const { user, game, notify } = this.props;
		if(this.state.title === '') {
			notify({
				message: {
					en: 'title cannot be empty',
					ch: '房间名不能为空'
				}
			});
			return;
		}
		socket.emit('client.table.new', { 
			userId: user._id, 
			gameId: game.id,
			title: this.state.title
		});
		this.setState({new: false});
	}
}

function mapStateToProps({ client, tables, users }) {
	return {
		clientWidth: client.clientWidth,
		clientHeight: client.clientHeight,
		folded: client.gameInfo.folded,
		game: client.gameInfo.game,
		language: client.language,
		user: client.user,
		users,
		tables
	};
}

export default connect(mapStateToProps, { setGameInfoFolded, setLoginVisible, notify })(GameInfo);