import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';

import styles from './bloody_inn.css';

class BloodyInn extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { clientHeight } = this.props;
		return (
			<div 
				className={styles.container}
				style={{height: clientHeight}}
			>
				<div 
					className={styles.board}
					style={{
						top: (clientHeight - 450) / 2,
						left: (clientWidth - 800) / 2
					}}
				>
					<img src='./img/bloody_inn/board.jpg' className={styles.bg} />
				</div>
			</div>
		);
	}
}

function mapStateToProps({ client, board }) {
	return {
		clientHeight: client.clientHeight,
		clientWidth: client.clientWidth
	};
}

export default connect(mapStateToProps, null)(BloodyInn);