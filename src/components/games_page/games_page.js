import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import { debounce } from 'lodash';


import styles from './games_page.css';

class GamesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			y: 0
		};
		this.handleWheel = this.handleWheel.bind(this);
	}

	render() {
		const height = this.props.clientHeight;
		return (
			<div>
				<Motion style={{y: spring(this.state.y)}}>
					{({ y }) => 
						<div style={{ 
								height,
								transform: `translate3d(0, ${y}px, 0)`
							}}
							onWheel={this.handleWheel}>
							<div className={styles.game + ' ' + styles.tnl}>
							</div>
							<div className={styles.game + ' ' + styles.coup}>
							</div>
							<div className={styles.game + ' ' + styles.orange}>
							</div>
							<div className={styles.game + ' ' + styles.blue}>
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
		y += e.deltaY * -1.5;
		if(y >= 0) y = 0;
		if(y <= -1 * h * 3) y = -1 * h * 3;
		this.setState({ y });
		window.clearTimeout(this._timer);
		this._timer = window.setTimeout(() => {
			const n = y / h | 0;
			y = h * (Math.abs(y % h) >= h / 2 ? n - 1 : n);
			this.setState({ y });
		},120);
	}
};

function mapStateToProps(state) {
	return {clientHeight: state.appearance.clientHeight};
}

export default connect(mapStateToProps, null)(GamesPage);
