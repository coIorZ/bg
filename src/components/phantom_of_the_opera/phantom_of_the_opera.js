import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';

import Card from './card';
import Log from './log';
import CardViewer from '../card_viewer';
import styles from './phantom_of_the_opera.css';

import { CARDS, TOKENS } from '../../../core/phantom_of_the_opera';

class POTO extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { clientHeight, board, user, users, logs } = this.props;
		const { table, data } = board;
		const { deck, alibis, turn, laCarlotta, exit, lock, rooms, roles, investigator, phantom, phase } = data;
		const isPhantom = phantom.player === user._id;
		const myself = isPhantom ? phantom : investigator;
		const opponent = isPhantom ? investigator : phantom;
		const myTurn = (isPhantom && !turn) || (!isPhantom && turn);
		return (
			<div 
				className={styles.container}
				style={{height: clientHeight}}
			>
				<div 
					className={styles.board}
					style={{
						top: (clientHeight - 450) / 2
					}}
				>
					<img src='./img/phantom_of_the_opera/board.jpg' className={styles.bg} />
					<div style={{position: 'absolute', left: 30, top: 20}}>
						<div className={styles.label}>Deck({deck.length})</div>
						<Card display={0} />
					</div>
					<div style={{position: 'absolute', left: 110, top: 20}}>
						<div className={styles.label}>Alibis({alibis.length})</div>
						<Card display={-1} />
					</div>
					<div style={{position: 'absolute', right: 140, bottom: 15, color: 'red'}}>
						La Carlotta: {laCarlotta}
					</div>
					<div style={{position: 'absolute', right: 40, bottom: 15}}>
						Exit: {exit}
					</div>
					{_.map(rooms, room => {
						return <div 
									style={{
										position: 'absolute',
										left: roomUI[room.id].left,
										top: roomUI[room.id].top,
										width: roomUI[room.id].width,
										height: roomUI[room.id].height
									}}
									key={room.id}
								>
									<div className={styles['room-id']}>{room.id}</div>
									{room.tokens.map(token => {
										return <Card id={token} display={3} key={token} />
									})}
								</div>
					})}
				</div>
				<div 
					className={styles['roles-holder']}
					style={{
						top: (clientHeight - 450) / 2 + 20
					}}
				>
					{roles.map(role => {
						return <Card 
									id={role.id} 
									display={1} 
									playable={role.available}
									key={role.id}
								/>
					})}
				</div>
				<div className={cx({
					[styles.opponent]: true,
					[styles.player]: true,
					[styles.active]: !myTurn
				})}>
					<div className={styles.name}>{users[opponent.player].name}</div>
					<div className={styles.identity}>{isPhantom ? 'The Investigator' : 'Phantom'}</div>
					{!isPhantom ? 
						<div className={styles['phantom-holder']}>
							<div className={styles.label}>Phantom</div>
							<Card display={-1} />
						</div>
						: null
					}
				</div>
				<div className={cx({
					[styles.myself]: true,
					[styles.player]: true,
					[styles.active]: myTurn
				})}>
					<div className={styles.name}>{user.name}</div>
					<div className={styles.identity}>{isPhantom ? 'Phantom' : 'The Investigator'}</div>
					{isPhantom ? 
						<div className={styles['phantom-holder']}>
							<Card 
								id={myself.phantom} 
								display={1} 
							/>
						</div>
						: null
					}
				</div>
				<CardViewer />
				<Log logs={logs} users={users} height={clientHeight - 445} />
			</div>
		);
	}
}

function mapStateToProps({ client, board, users, logs }) {
	return {
		clientHeight: client.clientHeight,
		user: client.user,
		board,
		users,
		logs
	};
}

export default connect(mapStateToProps, null)(POTO);

const roomUI = {
	'1': {left: 250, top: 100, width: 170, height: 70},
	'2': {left: 470, top: 100, width: 160, height: 90},
	'3': {left: 650, top: 220, width: 110, height: 90},
	'4': {left: 630, top: 330, width: 110, height: 80},
	'5': {left: 470, top: 330, width: 120, height: 80},
	'6': {left: 270, top: 340, width: 160, height: 90},
	'7': {left: 70, top: 330, width: 150, height: 90},
	'8': {left: 60, top: 200, width: 150, height: 80},
	'9': {left: 250, top: 220, width: 170, height: 90},
	'10': {left: 470, top: 230, width: 140, height: 80}
};

const tokenUI = {

};