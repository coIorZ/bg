import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import styles from './board.css';

class Board extends Component {
	render() {
		const { clientHeight, boardVisible } = this.props;

		return (
			<div className={cx({
				[styles.container]: true,
				[styles.active]: boardVisible
			})}
				style={{height: clientHeight}}>

			</div>
		);
	}
}

function mapStateToProps({ client, board }) {
	return {
		clientHeight: client.clientHeight,
		boardVisible: client.boardVisible,
		board
	};
}

export default connect(mapStateToProps, null)(Board);