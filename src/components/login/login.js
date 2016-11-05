import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import styles from './login.css';

import { login, showLogin } from '../../actions';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps({ me }) {
		if(me !== this.props.me) {
			this.props.showLogin(false);
		}
	}

	render() {
		const { username, password } = this.state;
		const { visible } = this.props;
		return (
			<div className={cx({
				[styles.container]: true,
				[styles.visible]: visible
			})}>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input type='text'
							value={username}
							onChange={(e) => this.setState({username: e.target.value})} />
					</div>
					<div>
						<input type='password'
							value={password}
							onChange={(e) => this.setState({password: e.target.value})} />
					</div>
					<div>
						<button type='submit'>login</button>
					</div>
				</form>
			</div>
		);
	}

	handleSubmit(e) {
		e.preventDefault();
		const { username, password } = this.state;
		this.props.login(username, password);
		this.setState({
			username: '',
			password: ''
		});
	}
}

function mapStateToProps({ users }) {
	return {
		me: users.me
	};
}

export default connect(mapStateToProps, { login, showLogin })(Login);