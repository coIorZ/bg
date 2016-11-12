import React, { Component } from 'react';
import cx from 'classnames';

import Card from './card';
import styles from './player.css';

import { CARDS } from '../../../core/love_letter';

export default class Player extends Component {
	render() {
		const { player, user, users, active } = this.props;
		return (
			<div className={cx({
					[styles.container]: true,
					[styles.active]: active
				})}>
				<div>{users[player.id].name}</div>
				<div>vp: {player.vp}</div>
				<div>
					{player.discarded.map(id => {
						return <Card card={CARDS[id]} display={1} key={id} />
					})}
				</div>
			</div>
		);
	}
};