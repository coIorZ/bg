import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import styles from './card_viewer.css';

class CardViewer extends Component {
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
			>
				{name ? <div>{name}</div> : null}
				{value ? <div>{value}</div> : null}
				{text ? <div>{text}</div> : null}
				<img src={img} className={styles.bg} />
			</div>
		);
	}
};

function mapStateToProps({ client }) {
	return {
		cardView: client.cardView
	};
}

export default connect(mapStateToProps, null)(CardViewer);