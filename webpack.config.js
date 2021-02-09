const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production'

module.exports = {
  mode,
  entry: {
    filename: __dirname + '/src/index.js',
  },
  output: {
    filename: '[chunk].bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/i,
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          // MiniCSSExtractPlugin.loader,
        ],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      hash: true,
    }),
  ],
  devServer: {
    port: 3000,
  },
}
