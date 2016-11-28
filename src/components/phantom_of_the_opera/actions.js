import React, { Component } from 'react';
import cx from 'classnames';

import styles from './actions.css';

export default class Actions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: ''
		};
		this.handleClickMove = this.handleClickMove.bind(this);
		this.handleClickEffect = this.handleClickEffect.bind(this);
		this.handleClickEnd = this.handleClickEnd.bind(this);
	}

	render() {
		const { move, effect, end } = this.props.actions;
		if(!this.props.visible) {
			return null;
		}
		return (
			<div className={styles.container}>
				<div 
					className={cx({
						[styles.item]: true,
						[styles.unavailable]: !move,
						[styles.selected]: this.state.selected === 'move'
					})}
					onMouseDown={this.handleClickMove}
				>
					Move
				</div>
				<div 
					className={cx({
						[styles.item]: true,
						[styles.unavailable]: !effect,
						[styles.selected]: this.state.selected === 'effect'
					})}
					onMouseDown={this.handleClickEffect}
				>
					Ability
				</div>
				<div 
					className={cx({
						[styles.item]: true,
						[styles.unavailable]: !end,
						[styles.selected]: this.state.selected === 'end'
					})}
					onMouseDown={this.handleClickEnd}
				>
					End turn
				</div>
			</div>
		);
	}

	handleClickMove() {
		const { onClickMove, actions } = this.props;
		if(onClickMove && actions.move) {
			this.setState({selected: 'move'});
			onClickMove();
		}
	}

	handleClickEffect() {
		const { onClickEffect, actions } = this.props;
		if(onClickEffect && actions.effect) {
			this.setState({selected: 'effect'});
			onClickEffect();
		}
	}

	handleClickEnd() {
		const { onClickEnd, actions } = this.props;
		if(onClickEnd && actions.end) {
			this.setState({selected: 'end'});
			onClickEnd();
		}
	}
};