import React, { Component } from 'react';

import Card from './card';
import styles from './card_list.css';

import { CARDS } from '../../../core/love_letter';

export default class CardList extends Component {
	render() {
		const { visible, onMouseDown } = this.props;
		if(!visible) return null;
		return (
			<div className={styles.container}>
				<div className={styles.label}>Choose a non-Guard card</div>
				{[2,3,4,5,6,7,8].map(i => {
					return <Card 
								card={CARDS[i]} 
								display={1} 
								playable={1} 
								key={i}
								onMouseDown={(card) => onMouseDown(card)} 
							/>
				})}
			</div>
		);
	}
};