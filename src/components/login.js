import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import md5 from 'blueimp-md5';

import styles from './login.css';

import { login, setLoginVisible } from '../actions';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	render() {
		const { username, password } = this.state;
		const { visible } = this.props;
		return (
			<div 
				className={cx({
					[styles.container]: true,
					[styles.visible]: visible
				})}
			>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input 
							type='text'
							value={username}
							onChange={e => this.setState({username: e.target.value})} 
						/>
					</div>
					<div>
						<input 
							type='password'
							value={password}
							onChange={e => this.setState({password: e.target.value})} 
						/>
					</div>
					<div>
						<button className={styles.btn} type='submit'>login</button>
						<button 
							className={styles.btn} 
							style={{marginLeft: 20}}
							onMouseDown={this.handleCancel}
						>
							cancel
						</button>
					</div>
				</form>
			</div>
		);
	}

	handleSubmit(e) {
		e.preventDefault();
		const { username, password } = this.state;
		this.props.login(username, md5(password));
		this.setState({
			username: '',
			password: ''
		});
	}

	handleCancel() {
		this.props.setLoginVisible(false);
	}
}

export default connect(null, { login, setLoginVisible })(Login);