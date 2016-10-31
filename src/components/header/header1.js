import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './header.css';

export default class Header extends Component {
	render() {
		return (
			<div className={styles.container}>
				<ul>
					<li>
						<Link to='games'> GAMES </Link>
					</li>
					<li>
						<Link to='news'> NEWS </Link>
					</li>
					<li>
						<Link to='about'> ABOUT </Link>
					</li>
				</ul>
			</div>
		);
	}
};