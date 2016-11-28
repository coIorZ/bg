import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import styles from './card.css';

import { CARDS, TOKENS } from '../../../core/phantom_of_the_opera';
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
		const { display, id, playable, used, mr } = this.props;
		switch(display) {
		case -1:
			return (
				<div 
					className={styles.card}
					style={{marginRight: mr || 4}}
				>
					<span className={styles.small}>Alibi Back</span>
					<img src={'./img/phantom_of_the_opera/alibi_back.jpg'} className={styles.bg} />
				</div>
			);

		case 0:
			return (
				<div 
					className={styles.card}
					style={{marginRight: mr || 4}}
				>
					<span className={styles.small}>Role Back</span>
					<img src={'./img/phantom_of_the_opera/role_back.jpg'} className={styles.bg} />
				</div>
			);

		case 1:
			const { name, value, text, img } = CARDS[id];
			return (
				<div 
					className={cx({
						[styles.card]: true,
						[styles.playable]: playable,
						[styles.forward]: this.state.forward && !used,
						[styles.used]: used
					})}
					style={{marginRight: mr || 4}}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
					onMouseDown={this.handleMouseDown}
				>
					<span className={styles.small}>{CARDS[id].name}</span>
					<img src={CARDS[id].img} className={styles.bg} />
				</div>
			);

		case 2:
			return (
				<span 
					className={styles.text}
					style={{color: CARDS[id].color}}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
				>
					{CARDS[id].name}
				</span>
			);

		case 3:
			return (
				<div
					className={cx({
						[styles.token]: true,
						[styles.playable]: playable
					})}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
					onMouseDown={this.handleMouseDown}
				>
					<img src={TOKENS[id].img} className={styles['token-img']} />
				</div>
			);

		default:
			return null;
		}
	}

	handleMouseEnter() {
		const { id, setCard, playable } = this.props;
		setCard(CARDS[id]);
		if(playable) this.setState({forward: true});
	}

	handleMouseLeave() {
		const { id, setCard, playable } = this.props;
		setCard(null);
		if(playable) this.setState({forward: false});
	}

	handleMouseDown() {
		const { onMouseDown, id, playable } = this.props;
		if(playable && onMouseDown) onMouseDown(CARDS[id]);
	}
};

export default connect(null, { setCard })(Card);