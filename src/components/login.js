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
			isRemember: JSON.parse(window.localStorage.getItem('isRemember')) || false,
			tip: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleRemember = this.handleRemember.bind(this);
	}

	render() {
		const { username, password, isRemember } = this.state;
		const { visible, language } = this.props;
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
						/> {language === 'ch' ? '记住我' : 'Remember me'}
						<br />
						<div style={{position: 'relative'}}>
							<span
								className={styles.dash}
								onMouseOver={() => this.setState({tip: true})}
								onMouseLeave={() => this.setState({tip: false})}
							>
								{language === 'ch' ? '没有帐号' : 'No account'}?
							</span>
							{this.state.tip ?
								<div className={styles.tip}>
									{language === 'ch' ?
										'暂不开放注册。请联系作者获取帐号。'
										: 'Sign up is not permitted for now. Please contact the author to get an account.'
									}
								</div>
								: null
							}
						</div>
					</div>
					<div>
						<button className={styles.btn} type='submit'>{language === 'ch' ? '登陆' : 'log in'}</button>
						<button 
							className={styles.btn} 
							style={{marginLeft: 20}}
							onMouseDown={this.handleCancel}
						>
							{language === 'ch' ? '取消' : 'cancel'}
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

function mapStateToProps({ client }) {
	return {
		language: client.language
	};
}

export default connect(mapStateToProps, { login, setLoginVisible })(Login);