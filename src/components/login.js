import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import md5 from 'blueimp-md5';

import styles from './login.css';

import { login, signup, setLoginVisible, notify } from '../actions';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: window.localStorage.getItem('username') || '',
			password: '',
			rusername: '',
			rname: '',
			rpassword: '',
			repassword: '',
			isRemember: JSON.parse(window.localStorage.getItem('isRemember')) || false,
			register: false,
			tip: false
		};
		this.handleSignin = this.handleSignin.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleRemember = this.handleRemember.bind(this);
	}

	render() {
		const { username, password, rusername, rname, rpassword, repassword, isRemember, register } = this.state;
		const { visible, language } = this.props;
		return (
			<div 
				className={cx({
					[styles.container]: true,
					[styles.visible]: visible
				})}
			>
				{register ? 
					<form onSubmit={this.handleSignup}>
						<div>
							<input 
								type='text'
								value={rusername}
								placeholder='username'
								onChange={e => this.setState({rusername: e.target.value})} 
							/>
						</div>
						<div>
							<input 
								type='text'
								value={rname}
								placeholder='nickname'
								onChange={e => this.setState({rname: e.target.value})} 
							/>
						</div>
						<div>
							<input 
								type='password'
								value={rpassword}
								placeholder='password'
								onChange={e => this.setState({rpassword: e.target.value})} 
							/>
						</div>
						<div>
							<input 
								type='password'
								value={repassword}
								placeholder='repassword'
								onChange={e => this.setState({repassword: e.target.value})} 
							/>
						</div>
						<div>
							<button className={styles.btn} type='submit'>{language === 'ch' ? '注册' : 'sign up'}</button>
							<button 
								className={styles.btn} 
								style={{marginLeft: 20}}
								onMouseDown={() => this.setState({register: false})}
							>
								{language === 'ch' ? '返回' : 'back'}
							</button>
						</div>
					</form>
					: <form onSubmit={this.handleSignin}>
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
									onMouseDown={() => this.setState({register: true, rusername: '', rname: '', rpassword: '', repassword: ''})}
								>
									{language === 'ch' ? '没有帐号? 立即注册' : 'No account? Sign up now'}
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
				}
			</div>
		);
	}

	handleSignin(e) {
		e.preventDefault();
		const { username, password, isRemember } = this.state;
		this.props.login(username, md5(password), isRemember);
		this.setState({password: ''});
	}

	handleSignup(e) {
		e.preventDefault();
		const { rusername, rname, rpassword, repassword } = this.state;
		if(!validate(rusername) || !rname || !validate(rpassword) || !validate(repassword)) {
			this.props.notify({
				message: {
					en: 'illegal values',
					ch: '不合法的值'
				}
			});
			return;
		}
		if(rpassword !== repassword) {
			this.props.notify({
				message: {
					en: 'password not matched',
					ch: '密码不一致'
				}
			});
			return;
		}
		this.setState({register: false});
		this.props.signup(rusername, rname, md5(rpassword));
	}

	handleRemember(e) {
		window.localStorage.setItem('isRemember', e.target.checked);
		this.setState({isRemember: e.target.checked});
	}

	handleCancel() {
		this.props.setLoginVisible(false);
	}
}

function validate(str) {
	return /^[0-9a-zA-Z]+$/.test(str);
}

function mapStateToProps({ client }) {
	return {
		language: client.language
	};
}

export default connect(mapStateToProps, { login, signup, setLoginVisible, notify })(Login);