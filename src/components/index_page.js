import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Message from './message';
import styles from './index_page.css';

import socket from '../sockets';
import { setLoginVisible, logout } from '../actions';

class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		};
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.refs.chat.scrollTop = this.refs.chat.scrollHeight;
	}

	componentDidUpdate() {
		this.refs.chat.scrollTop = this.refs.chat.scrollHeight;
	}

	render() {
		const { clientHeight, user, users, messages } = this.props;
		return (
			<div 
				className={styles.container}
				style={{
					height: clientHeight,
					backgroundImage: 'url(./img/main.jpg)'
				}}
			>
				<div className={styles.corner}>
					{user ?
						<span>
							{user.name}, <span className={styles.logout} onMouseDown={this.handleLogout}>Log out</span>
						</span>
						: <button
							className={styles.btn}
							onMouseDown={this.handleLogin}
						>
							Log in
						</button>
					}
				</div>
				<div className={styles.wrapper}>
					<div className={styles.body}>
						<h1 className={styles.title}>Play board games in your browser</h1>
						<div className={styles.chatroom}>
							<div 
								className={cx(styles.window, styles.area)}
								ref='chat'
								style={{
									height: clientHeight - 150
								}}
							>
								{messages.map(message => {
									return <Message message={message} users={users} key={message.date} />
								})}
							</div>
							<form className={styles.input} onSubmit={this.handleSubmit}>
								<input value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} />
								<button type='submit' className={styles.btn}> Enter</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}

	handleLogin() {
		this.props.setLoginVisible(true);
	}

	handleLogout() {
		const { logout, user } = this.props;
		logout(user._id);
	}

	handleSubmit(e) {
		const { user, setLoginVisible } = this.props;
		e.preventDefault();
		if(!user) {
			setLoginVisible(true);
			return;
		}
		if(this.state.message === '') return;
		socket.emit('client.message.new', {
			user: user._id,
			message: this.state.message
		});
		this.setState({message: ''});
	}
};

function mapStateToProps({ client, messages, users }) {
	return {
		clientHeight: client.clientHeight,
		user: client.user,
		users,
		messages
	};
}

export default connect(mapStateToProps, { setLoginVisible, logout })(IndexPage);