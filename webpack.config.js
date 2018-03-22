const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const cvConfig = require('./cv.config');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
});

const Page = {
  constructor: function(name, isPdf) {
    this.filename = name;
    this.isPdf = isPdf;
    return this;
  },
  template: './app/app.ejs',
  config: cvConfig
};

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
    new HtmlWebpackPlugin(Object.create(Page).constructor(cvConfig.name.html)), //html file
    new HtmlWebpackPlugin(Object.create(Page).constructor(cvConfig.name.htmlToPdf, true)), //pdf file
    new StyleExtHtmlWebpackPlugin()
  ]
};
