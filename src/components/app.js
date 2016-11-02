import React, { Component } from 'react';
import { connect } from 'react-redux';
import { throttle } from 'lodash';

import Header from './header/header';
import styles from './app.css';

import { setClientHeight, setClientWidth } from '../actions';

class App extends Component {
	constructor(props) {
		super(props);
		this.resize = throttle(this.resize.bind(this), 300);
	}

	componentDidMount() {
		window.addEventListener('resize', this.resize);
	}

	render() {
		return (
			<div className={styles.container}>
				{this.props.children}
			</div>
		);
	}

	resize() {
		this.props.setClientHeight(document.documentElement.clientHeight);
		this.props.setClientWidth(document.documentElement.clientWidth);
	}
}

export default connect(null, { setClientHeight, setClientWidth })(App);