import React, { Component } from 'react';
import { connect } from 'react-redux';
import { throttle } from 'lodash';

import Header from './header/header';
import styles from './app.css';

import { setClientHeight } from '../actions';

class App extends Component {
	render() {
		return (
			<div className={styles.container}>
				{this.props.children}
			</div>
		);
	}

	componentDidMount() {
		window.addEventListener('resize', throttle(() => 
			this.props.setClientHeight(document.documentElement.clientHeight)), 100);
	}
}

export default connect(null, { setClientHeight })(App);