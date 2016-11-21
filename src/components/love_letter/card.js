import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import styles from './card.css';

import CARDS from '../../../core/love_letter';
import { setCard } from '../../actions';

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			forward: false
		};
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
	}

	render() {
		switch(this.props.display) {
		case 0:
			return (
				<div 
					className={styles.card}
					style={{marginRight: this.props.mr || 2}}
				>
					<span className={styles.small}>Back</span>
					<img src={'./img/love_letter/back.jpg'} className={styles.bg} />
				</div>
			);

		case 1:
			const { card, display, playable } = this.props;
			const { name, value, text, img } = card;
			return (
				<div 
					className={cx({
						[styles.card]: true,
						[styles.playable]: playable,
						[styles.forward]: this.state.forward
					})}
					style={{marginRight: this.props.mr || 2}}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
					onMouseDown={this.handleMouseDown}
				>
					<span className={styles.small}>{name}</span>
					<img src={img} className={styles.bg} />
				</div>
			);

		case 2:
			return (
				<span 
					className={styles.text}
					style={{color: this.props.card.color}}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
				>
					{this.props.card.name}
				</span>
			);

		default:
			return null;
		}
	}

	handleMouseEnter() {
		const { card, setCard, playable } = this.props;
		setCard(card);
		if(playable) this.setState({forward: true});
	}

	handleMouseLeave() {
		const { card, setCard, playable } = this.props;
		setCard(null);
		if(playable) this.setState({forward: false});
	}

	handleMouseDown() {
		const { onMouseDown, card, playable } = this.props;
		if(playable && onMouseDown) onMouseDown(card);
	}
};

export default connect(null, { setCard })(Card);