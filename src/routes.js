import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import GamesPage from './components/games_page';
import IndexPage from './components/index_page';
import AboutPage from './components/about_page';

export default (
	<Route path='/' component={App}>
		<IndexRoute component={IndexPage} />
		<Route path='play' component={GamesPage} />
		<Route path='index' component={IndexPage} />
		<Route path='about' component={AboutPage} />
	</Route>
);