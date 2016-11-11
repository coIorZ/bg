import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import styles from './card.css';

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
		const { card, display, playable } = this.props;
		const { id, name, value, text, img } = card;
		switch(display) {
		case 0:
			return (
				<div className={styles.card}>
					<span className={styles.text}>Back</span>
					<img src={'./img/love_letter/back.jpg'} className={styles.bg} />
				</div>
			);

		case 1:
			return (
				<div className={cx({
						[styles.card]: true,
						[styles.playable]: playable,
						[styles.forward]: this.state.forward
					})}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
					onMouseDown={this.handleMouseDown}>
					<span className={styles.text}>{name}</span>
					<img src={img} className={styles.bg} />
				</div>
			);

		case 2:
			return (
				<span style={{color: 'orange'}}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}>{name}</span>
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
		const { onMouseDown } = this.props;
		if(onMouseDown) onMouseDown();
	}
};

export default connect(null, { setCard })(Card);