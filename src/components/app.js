import React, { Component } from 'react';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import  { NotificationStack } from 'react-notification';

import Login from './login';
import Header from './header';
import styles from './app.css';

import { setClientHeight, setClientWidth, userAuth, dismissNotification, logout } from '../actions';

class App extends Component {
	constructor(props) {
		super(props);
		this.handleResize = throttle(this.handleResize.bind(this), 300);
		this.handleUnload = this.handleUnload.bind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		window.addEventListener('unload', this.handleUnload);
		this.props.userAuth();
	}

	render() {
		const { children, loginVisible, notifications, dismissNotification } = this.props;
		return (
			<div className={styles.container}>
				{children}
				<Header />
				<Login visible={loginVisible}/>
				<NotificationStack
					notifications={notifications}
					onDismiss={notification => dismissNotification(notification.key)}
				/>
			</div>
		);
	}

	handleResize() {
		const { clientHeight, clientWidth } = document.documentElement;
		this.props.setClientHeight(clientHeight);
		this.props.setClientWidth(clientWidth);
	}

	handleUnload() {
		this.props.logout(this.props.user._id);
	}
}

function mapStateToProps({ client }) {
	return {
		loginVisible: client.loginVisible,
		notifications: client.notifications,
		user: client.user
	};
}

export default connect(mapStateToProps, { setClientHeight, setClientWidth, userAuth, dismissNotification, logout })(App);