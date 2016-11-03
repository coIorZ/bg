import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';

import styles from './game_info.css';

class GameInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			folded: 1  // 1-half  2-full  0-folded
		};
		this.unfold = this.unfold.bind(this);
	}

	componentWillReceiveProps({ folded }) {
		if(folded !== this.state.folded) this.setState({ folded });
	}

	render() {
		const folded = this.state.folded;
		const { width, height } = this.props;
		const x = folded === 0 ?
					width : folded === 1 ?
						 0.75 * width : width / 2;

		return (
			<Motion style={{x: spring(x)}}>
			{({ x }) => 
				<div className={styles.container}
					style={{
						height,
						transform: `translateX(${x}px)`
					}}>
					<div style={{width: width / 4}}>
						<div className={styles.btn} onClick={this.unfold}>Play</div>
					</div>
				</div>
			}
			</Motion>
		);
	}

	unfold() {
		this.setState({folded: 2});
	}
}

function mapStateToProps({ appearance }) {
	return {
		width: appearance.clientWidth,
		height: appearance.clientHeight
	};
}

export default connect(mapStateToProps, null)(GameInfo);