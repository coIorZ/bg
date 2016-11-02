import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import Game from './game';
import GameInfo from './game_info';
import { fetchGames } from '../../actions';

class GamesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			y: 0,
			folded: 1,
			game: null
		};
		this.handleWheel = this.handleWheel.bind(this);
	}

	componentDidMount() {
		this.props.fetchGames();
	}

	render() {
		const { height, games } = this.props;
		const { y, folded } = this.state;
		return (
			<div>
				<Motion style={{y: spring(y)}}>
					{({ y }) => 
						<div style={{
								height,
								transform: `translate3d(0, ${y}px, 0)`
							}}
							onWheel={this.handleWheel}>
							{games.map((game) => 
								<Game key={game._id} game={game} />
							)}
						</div>
					}
				</Motion>
				<GameInfo folded={folded} />
			</div>
		);
	}

	handleWheel(e) {
		const h = this.props.height;
		const limit = this.props.games.length - 1;
		let y = this.state.y;
		y += e.deltaY * -1.5;
		if(y >= 0) y = 0;
		if(y <= -1 * h * limit) y = -1 * h * limit;
		this.setState({ y, folded: 0 });
		window.clearTimeout(this._timer);
		this._timer = window.setTimeout(() => {
			const n = y / h | 0;
			y = h * (Math.abs(y % h) >= h / 2 ? n - 1 : n);
			this.setState({ y, folded: 1 });
		}, 100);
	}
};

function mapStateToProps({ appearance, games}) {
	return {
		height: appearance.clientHeight,
		games
	};
}

export default connect(mapStateToProps, { fetchGames })(GamesPage);
