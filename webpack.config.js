var webpack = require('webpack');

var dev = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: {
		'./server/public/js/bundle': './src/index.js'
	},
	output: {
		path: __dirname,
		publicPath: '/',
		filename: '[name].js'
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
	devtool: dev ? 'source-map' : null,
	plugins: dev ? [] : [
		new webpack.optimize.DedupePlugin(),
  		new webpack.optimize.OccurenceOrderPlugin(),
  		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  		new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
	]
}