import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import styles from './card_viewer.css';

class CardViewer extends Component {
	render() {
		const { card } = this.props;
		if(!card) return null;
		const { name, value, text, img } = card;
		return (
			<div className={styles.container}>
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
		card: client.card
	};
}

export default connect(mapStateToProps, null)(CardViewer);