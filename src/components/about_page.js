import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './about_page.css';

import { setHeaderPage } from '../actions';

class AboutPage extends Component {
	componentDidMount() {
		this.props.setHeaderPage('about');
	}

	render() {
		const { clientHeight } = this.props;
		return (
			<div 
				className={styles.container}
				style={{
					height: clientHeight
				}}
			>
				<h3>作者很懒，什么都没写。。。</h3>
				<h3>The author is too lazy to write some css...</h3>
			</div>
		);
	}
};

function mapStateToProps({ client }) {
	return {
		clientHeight: client.clientHeight
	};
}

export default connect(mapStateToProps, { setHeaderPage })(AboutPage);