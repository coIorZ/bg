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
		const { actions, language } = this.props;
		const { move, effect, end } = actions;
		return (
			<div className={styles.container}>
				<span style={{marginRight: 20}}>{language === 'en' ? 'Choose an action: ' : '选择一个行动: '}</span>
				<span 
					className={cx({
						[styles.item]: true,
						[styles.unavailable]: !move,
						[styles.selected]: this.state.selected === 'move'
					})}
					onMouseDown={this.handleClickMove}
				>
					{language === 'en' ? 'Move' : '移动'}
				</span>
				<span 
					className={cx({
						[styles.item]: true,
						[styles.unavailable]: !effect,
						[styles.selected]: this.state.selected === 'effect'
					})}
					onMouseDown={this.handleClickEffect}
				>
					{language === 'en' ? 'Ability' : '技能'}
				</span>
				<span 
					className={cx({
						[styles.item]: true,
						[styles.unavailable]: !end,
						[styles.selected]: this.state.selected === 'end'
					})}
					onMouseDown={this.handleClickEnd}
				>
					{language === 'en' ? 'End Turn' : '结束回合'}
				</span>
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