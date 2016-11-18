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
			username: window.localStorage.getItem('username') || '',
			password: '',
			isRemember: JSON.parse(window.localStorage.getItem('isRemember')) || false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleRemember = this.handleRemember.bind(this);
	}

	render() {
		const { username, password, isRemember } = this.state;
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
					<div className={styles.remember}>
						<input 
							type='checkbox' 
							checked={isRemember} 
							onChange={this.handleRemember}
						/> Remember me
					</div>
					<div>
						<button className={styles.btn} type='submit'>log in</button>
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
		const { username, password, isRemember } = this.state;
		this.props.login(username, md5(password), isRemember);
		this.setState({password: ''});
	}

	handleRemember(e) {
		window.localStorage.setItem('isRemember', e.target.checked);
		this.setState({isRemember: e.target.checked});
	}

	handleCancel() {
		this.props.setLoginVisible(false);
	}
}

export default connect(null, { login, setLoginVisible })(Login);