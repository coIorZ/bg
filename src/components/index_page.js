import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './index_page.css';

class IndexPage extends Component {
	render() {
		const { clientHeight } = this.props;
		return (
			<div 
				className={styles.container}
				style={{
					height: clientHeight
				}}
			>
				
			</div>
		);
	}
};

function mapStateToProps({ client }) {
	return {
		clientHeight: client.clientHeight
	};
}

export default connect(mapStateToProps, null)(IndexPage);