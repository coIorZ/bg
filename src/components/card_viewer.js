import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import styles from './card_viewer.css';

import { setCard } from '../actions';

class CardViewer extends Component {
	constructor(props) {
		super(props);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
	}

	render() {
		const { cardView } = this.props;
		if(!cardView) return null;
		const { card, x, y } = cardView;
		const { name, value, text, img } = card;
		return (
			<div 
				className={styles.container}
				style={{
					left: x,
					top: y
				}}
				onMouseEnter={this.handleMouseEnter}
			>
				{name ? <div>{name}</div> : null}
				{value ? <div>{value}</div> : null}
				{text ? <div>{text}</div> : null}
				<img src={img} className={styles.bg} />
			</div>
		);
	}

	handleMouseEnter() {
		this.props.setCard(null);
	}
};

function mapStateToProps({ client }) {
	return {
		cardView: client.cardView
	};
}

export default connect(mapStateToProps, { setCard })(CardViewer);