import React, { Component } from 'react';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import  { NotificationStack } from 'react-notification';

import Login from './login';
import styles from './app.css';

import { setClientHeight, setClientWidth, userAuth, dismissNotification } from '../actions';

class App extends Component {
	constructor(props) {
		super(props);
		this.resize = throttle(this.resize.bind(this), 300);
	}

	componentDidMount() {
		window.addEventListener('resize', this.resize);
		this.props.userAuth();
	}

	render() {
		const { children, loginVisible, notifications, dismissNotification } = this.props;
		return (
			<div className={styles.container}>
				{children}
				<Login visible={loginVisible}/>
				<NotificationStack
					notifications={notifications}
					onDismiss={notification => dismissNotification(notification.key)}
				/>
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
		loginVisible: client.loginVisible,
		notifications: client.notifications
	};
}

export default connect(mapStateToProps, { setClientHeight, setClientWidth, userAuth, dismissNotification })(App);