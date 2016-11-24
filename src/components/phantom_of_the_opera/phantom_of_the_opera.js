import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Card from './card';
import Log from './log';
import CardViewer from '../card_viewer';
import styles from './phantom_of_the_opera.css';

import { CARDS } from '../../../core/phantom_of_the_opera';

class POTO extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { clientHeight, board, user, users, logs } = this.props;
		const { table, data } = board;
		const { deck, alibis, turn, laCarlotta, exit, lock, rooms, roles, investigator, phantom, phase } = data;
		
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
				</div>
				<div 
					className={styles['roles-holder']}
					style={{
						top: (clientHeight - 450) / 2 + 20
					}}
				>
					{roles.map((role, i) => {
						return <Card 
									card={CARDS[role.id]} 
									display={1} 
									playable={role.available}
									key={i}
								/>
					})}
				</div>
				<div className={styles.opponent}>

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