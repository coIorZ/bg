import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import styles from './card.css';

import { CARDS, TOKENS } from '../../../core/phantom_of_the_opera';
import { setCard } from '../../actions';

class Card extends Component {
	constructor(props) {
		super(props);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
	}

	render() {
		const { display, id, playable, mr, label, small, unavailable } = this.props;
		const card = CARDS[id];
		const token = TOKENS[id];
		switch(display) {
		case -1:
			return (
				<span 
					style={{
						color: card.color,
						fontWeight: 'bold'
					}}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
				>
					{card.name}
				</span>
			);

		case 1:
			return (
				<div 
					className={cx({
						[styles.container]: true,
						[styles.token]: true,
						[styles.playable]: playable
					})}
					style={{
						width: small ? token.width / 1.8 : token.width,
						height: small ? token.height / 1.8 : token.height,
						marginRight: mr
					}}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
					onMouseDown={this.handleMouseDown}
				>
					<img 
						src={token.img} 
						className={styles.bg} 
						style={{
							width: small ? token.width / 1.8 : token.width,
							height: small ? token.height / 1.8 : token.height
						}}
					/>
					<span className={styles.label}>{label}</span>
				</div>
			);

		default:
			return (
				<div 
					className={cx({
						[styles.container]: true,
						[styles.playable]: playable,
						[styles.unavailable]: unavailable
					})}
					style={{
						width: small ? card.width / 1.8 : card.width,
						height: small ? card.height / 1.8 : card.height,
						marginRight: mr
					}}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
					onMouseDown={this.handleMouseDown}
				>
					<img 
						src={card.img} 
						className={styles.bg} 
						style={{
							width: small ? card.width / 1.8 : card.width,
							height: small ? card.height / 1.8 : card.height
						}}
					/>
					<span className={styles.label}>{label}</span>
				</div>
			);
		}
	}

	handleMouseEnter(e) {
		const { id, setCard } = this.props;
		if(id > 0) setCard(CARDS[id], e.pageX, e.pageY);
	}

	handleMouseLeave() {
		const { id, setCard } = this.props;
		if(id > 0) setCard(null);
	}

	handleMouseDown() {
		const { onMouseDown, id, playable } = this.props;
		if(playable && onMouseDown) onMouseDown(id);
	}
};

export default connect(null, { setCard })(Card);