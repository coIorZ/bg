import React, { Component } from 'react';
import { connect } from 'react-redux';
import { throttle } from 'lodash';

import Login from './login';
import styles from './app.css';

import { setClientHeight, setClientWidth, userAuth } from '../actions';

class App extends Component {
	constructor(props) {
		super(props);
		this.resize = throttle(this.resize.bind(this), 300);
	}

	componentDidMount() {
		window.addEventListener('resize', this.resize);
		// this.props.userAuth();
	}

	render() {
		return (
			<div className={styles.container}>
				{this.props.children}
				<Login visible={this.props.loginVisible}/>
			</div>
		);
	}

	resize() {
		let { clientHeight, clientWidth } = document.documentElement;
		this.props.setClientHeight(clientHeight);
		this.props.setClientWidth(clientWidth);
	}
}

function mapStateToProps({ client }) {
	return {
		loginVisible: client.loginVisible
	};
}

export default connect(mapStateToProps, { setClientHeight, setClientWidth, userAuth })(App);