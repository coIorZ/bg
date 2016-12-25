import React, { Component } from 'react';
import cx from 'classnames';

import Card from './card';
import styles from './player.css';

export default class Player extends Component {
	constructor(props) {
		super(props);
		this.handleMouseDown = this.handleMouseDown.bind(this);
	}
	render() {
		const { player, data, user, users, onMouseDown } = this.props;
		const { activePlayer, players, phase, cardId, effect } = data;
		const n = player.discarded.length;
		const mr = n > 5 ? (285 - 54 * n) / (n - 1) : 0;
		const myTurn = players[activePlayer].id === user._id;
		const myself = _.find(players, player => player.id === user._id);
		this._selectable = phase === 'choose.player' && myTurn && (player.id !== user._id || cardId === 5);
		return (
			<div 
				className={cx({
					[styles.container]: true,
					[styles.active]: players[activePlayer].id === player.id,
					[styles.selectable]: this._selectable,
					[styles.selected]: phase === 'effect' && effect === player.id,
					[styles.out]: player.out
				})}
				onMouseDown={this.handleMouseDown}
			>
				<div>
					<span>{users[player.id].name}</span>
				</div>
				<div>
					<span>vp: {player.vp}</span>
				</div>
				<div>
					{player.discarded.map((id, i) => {
						return <Card id={id} display={1} small={true} mr={mr} key={i} />
					})}
				</div>
				{phase === 'round' ? 
					<div 
						className={styles.hands}
						style={{right: -54 * player.hands.length - 10}}
					>
						{player.hands.map((id, i) => {
							return <Card id={id} display={1} small={true} key={i} />;
						})}
					</div> 
					: null
				}
			</div>
		);
	}

	handleMouseDown() {
		const { onMouseDown, player } = this.props;
		if(onMouseDown && this._selectable) onMouseDown(player);
	}
};