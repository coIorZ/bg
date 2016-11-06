import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import GamesPage from './components/games_page';
import NewsPage from './components/news_page';
import AboutPage from './components/about_page';

export default (
	<Route path='/' component={App}>
		<IndexRoute component={GamesPage} />
		<Route path='games' component={GamesPage} />
		<Route path='news' component={NewsPage} />
		<Route path='about' component={AboutPage} />
	</Route>
);