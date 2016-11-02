import React, { Component } from 'react';
import { connect } from 'redux';
import { Motion, spring } from 'react-motion';

class SideBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		clientHeight: state.appearance.clientHeight
	};
}

export default connect(mapStateToProps, null)(SideBar);