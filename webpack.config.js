/**
 *
 */

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
	entry: __dirname + '/web/app/js/main.js',
	output: {
		path: __dirname + '/web/public',
		filename: 'bundle.js'
	},
	resolve: {
		alias: {
			jquery: "jquery/src/jquery",
			bootstrap: "bootstrap/dist/js/bootstrap.js",
		}
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel?cacheDirectory'
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style', 'css!less')
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('bundle.css'),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	]
};

module.exports = config;
