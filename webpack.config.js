var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		'./src/index.js'
	],
	output: {
		path: __dirname,
		publicPath: '/',
		filename: './public/bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react', 'stage-1']
			},
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			loader: 'style!css?modules=true'
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loader: 'url'
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devtool: 'source-map'
}