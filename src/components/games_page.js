import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import _ from 'lodash';

import GameInfo from './game_info';
import Board from './board';
import styles from './games_page.css';

import { setGameInfoFolded, setHeaderPage } from '../actions';

class GamesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			y: 0,
			game: {}
		};
		this.handleWheel = this.handleWheel.bind(this);
	}

	componentDidMount() {
		if(this.props.games) {
			this.setState({game: this.props.games[0] || {}});
		}
		this.props.setHeaderPage('play');
	}

	componentWillReceiveProps({ games }) {
		if(games != this.props.games) {
			this.setState({game: games[0] || {}});
		}
	}

	render() {
		const { clientHeight, clientWidth, games, folded } = this.props;
		const { y, game } = this.state;
		if(!games) {
			return null;
		}
		return (
			<div className={styles.container}>
				<Motion style={{y: spring(y)}}>
					{({ y }) => 
						<div 
							style={{
								height: clientHeight,
								transform: `translate3d(0, ${y}px, 0)`,
								WebkitTransform: `translate3d(0, ${y}px, 0)`
							}}
							onWheel={this.handleWheel}
							onMouseDown={() => this.props.setGameInfoFolded(1)}
						>
							{_.map(games, game => 
								<div 
									className={styles.game}
									key={game.id}
									style={{backgroundImage: `url(${game.img_url})`}}
								>
								</div>
							)}
						</div>
					}
				</Motion>
				<GameInfo game={game} />
				<Board gameId={game.id} />
			</div>
		);
	}

	handleWheel(e) {
		const { clientHeight, games } = this.props;
		const limit = games.length - 1;
		let y = this.state.y;
		y += e.deltaY * -2.5;
		if(y >= 0) y = 0;
		if(y <= -1 * clientHeight * limit) y = -1 * clientHeight * limit;
		this.setState({ y });
		this.props.setGameInfoFolded(0);
		window.clearTimeout(this._timer);
		this._timer = window.setTimeout(() => {
			let n = y / clientHeight | 0;
			n = Math.abs(y % clientHeight) >= clientHeight / 2 ? n - 1 : n;
			y = clientHeight * n;
			this.setState({
				y,
				game: games[-1 * n]
			});
			this.props.setGameInfoFolded(1);
		}, 100);
	}
};

function mapStateToProps({ client, games }) {
	return {
		clientHeight: client.clientHeight,
		clientWidth: client.clientWidth,
		games
	};
}

export default connect(mapStateToProps, { setGameInfoFolded, setHeaderPage })(GamesPage);
