import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import { throttle } from 'lodash';

import styles from './games_page.css';

class GamesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			y: 0
		};
	}

	render() {
		const height = this.props.clientHeight;
		return (
			<div>
				<Motion style={{y: spring(this.state.y, 200)}}>
					{({ y }) => 
						<div style={{ 
								height,
								transform: `translate3d(0, ${y}px, 0)`
							}}
							onWheel={throttle(this.handleWheel.bind(this), 100)}>
							<div className={styles.game + ' ' + styles.tnl}>
							</div>
							<div className={styles.game + ' ' + styles.coup}>
							</div>
						</div>
					}
				</Motion>
			</div>
		);
	}

	handleWheel(e) {
		if(e.deltaY == 0) return;
		const h = this.props.clientHeight;
		let y = this.state.y;
		y += e.deltaY * -1;
		if(y >= 0) y = 0;
		this.setState({ y });
		window.clearTimeout(this._timer);
		this._timer = window.setTimeout(() => {
			const n = y / h | 0;
			y = h * (Math.abs(y % h) >= h * (e.deltaY > 0 ? 1/3 : 2/3) ? n - 1 : n);
			this.setState({ y });
		},120);
	}
};

function mapStateToProps(state) {
	return {clientHeight: state.appearance.clientHeight};
}

export default connect(mapStateToProps, null)(GamesPage);
