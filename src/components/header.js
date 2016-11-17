import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './header.css';

import { setHeaderPage } from '../actions';

class Header extends Component {
	constructor(props) {
		super(props);
		this.handleCosmos = this.handleCosmos.bind(this);
		this.handlePlay = this.handlePlay.bind(this);
		this.handleAbout = this.handleAbout.bind(this);
	}

	render() {
		const { page } = this.props;
		return (
			<div className={styles.container}>
				<ul className={styles.list}>
					<li 
						className={cx({
							[styles.item]: true,
							[styles.active]: page === 'cosmos'
						})}
						onMouseDown={this.handleCosmos}
					>
						<Link to='index'> Cosmos </Link>
					</li>
					<li 
						className={cx({
							[styles.item]: true,
							[styles.active]: page === 'play'
						})}
						onMouseDown={this.handlePlay}
					>
						<Link to='play'> Play </Link>
					</li>
					<li 
						className={cx({
							[styles.item]: true,
							[styles.active]: page === 'about'
						})}
						onMouseDown={this.handleAbout}
					>
						<Link to='about'> About </Link>
					</li>
				</ul>
			</div>
		);
	}

	handleCosmos() {
		this.props.setHeaderPage('cosmos');
	}

	handlePlay() {
		this.props.setHeaderPage('play');
	}

	handleAbout() {
		this.props.setHeaderPage('about');
	}
};

function mapStateToProps({ client }) {
	return {
		page: client.page
	};
}

export default connect(mapStateToProps, { setHeaderPage })(Header);