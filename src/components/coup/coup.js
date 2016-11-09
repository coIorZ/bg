import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import styles from './coup.css';

import { setBoardVisible } from '../../actions';

class Coup extends Component {
	render() {
		const { clientHeight, board } = this.props;

		return (
			<div className={styles.container}
				style={{height: clientHeight}}>
				
			</div>
		);
	}
}

function mapStateToProps({ client, board }) {
	return {
		clientHeight: client.clientHeight,
		board
	};
}

export default connect(mapStateToProps, { setBoardVisible })(Coup);