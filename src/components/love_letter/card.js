import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import styles from './card.css';

import { CARDS } from '../../../core/love_letter';
import { setCard } from '../../actions';

class Card extends Component {
	constructor(props) {
		super(props);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
	}

	render() {
		const { display, id, playable, mr, label, small } = this.props;
		switch(display) {
		case 0:
			return (
				<div 
					className={cx({
						[styles.container]: true,
						[styles.small]: small
					})}
					style={{marginRight: mr}}
				>
					<img src={'./img/love_letter/back.jpg'} className={styles.bg} />
					<span className={styles.label}>{label}</span>
				</div>
			);

		case 1:
			return (
				<div 
					className={cx({
						[styles.container]: true,
						[styles.small]: small,
						[styles.playable]: playable
					})}
					style={{marginRight: mr}}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
					onMouseDown={this.handleMouseDown}
				>
					<img src={CARDS[id].img} className={styles.bg} />
					<span className={styles.label}>{label}</span>
				</div>
			);

		case -1:
			return (
				<span 
					style={{
						color: CARDS[id].color,
						fontWeight: 'bold'
					}}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
				>
					{CARDS[id].name}
				</span>
			);

		default:
			return null;
		}
	}

	handleMouseEnter(e) {
		const { id, setCard } = this.props;
		setCard(CARDS[id], e.pageX, e.pageY);
	}

	handleMouseLeave() {
		const { id, setCard } = this.props;
		setCard(null);
	}

	handleMouseDown() {
		const { onMouseDown, id, playable } = this.props;
		if(playable && onMouseDown) onMouseDown(id);
	}
};

export default connect(null, { setCard })(Card);