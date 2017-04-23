const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const pdfConfig = require('./pdf.config');

const extractSass = new ExtractTextPlugin({
	filename: '[name].[contenthash].css',
});

module.exports = {
	entry: './app/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [{
			test: /\.scss$/,
			include: [
				path.resolve(__dirname, './app'),
				path.resolve(__dirname, './typebase/src'),
			],
			use: extractSass.extract({
				use: [
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					'sass-loader'
				]
			})
		}]
	},
	plugins: [
		extractSass,
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './app/app.ejs',
			pdf: pdfConfig
		}),
		new HtmlWebpackPlugin({
			filename: pdfConfig.filename.html,
			template: './app/app.ejs',
		}),
		new StyleExtHtmlWebpackPlugin()
	]
};
