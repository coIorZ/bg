import React, { Component } from 'react';
import cx from 'classnames';

import Card from './card';
import styles from './player.css';

import { CARDS } from '../../../core/love_letter';

export default class Player extends Component {
	constructor(props) {
		super(props);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
	}
	render() {
		const { player, user, users, active, selectable, selected, out, revealHands, confirmBtn } = this.props;
		return (
			<div className={cx({
					[styles.container]: true,
					[styles.active]: active,
					[styles.selectable]: selectable,
					[styles.selected]: selected,
					[styles.out]: out
				})}
				onMouseDown={this.handleMouseDown}>
				<div className={styles.name}>
					<span>{users[player.id].name}</span>
					<span className={styles.right}>vp: {player.vp}</span>
				</div>
				<div>
					{player.discarded.map((id, i) => {
						return <Card card={CARDS[id]} display={1} key={i} />
					})}
				</div>
				{revealHands ? <div className={styles.hands}
									style={{right: -64 * player.hands.length - 10}}>
								{player.hands.map((id, i) => {
									return <Card card={CARDS[id]} display={1} key={i} />;
								})}
							</div> : null}
				{confirmBtn ? <button className={styles.btn} onMouseDown={this.handleConfirm}>Ok</button> : null}
			</div>
		);
	}

	handleMouseDown() {
		const { onMouseDown, player, selectable } = this.props;
		if(onMouseDown && selectable) onMouseDown(player);
	}

	handleConfirm() {
		const { onConfirm } = this.props;
		if(onConfirm) onConfirm();
	}
};