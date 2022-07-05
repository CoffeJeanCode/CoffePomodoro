const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const mode =
//   process.env.NODE_ENV === 'development' ? 'development' : 'production'
const mode = "development";

module.exports = {
  mode,
  entry: {
    filename: __dirname + "/src/index.js",
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/i,
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        exclude: /node_modules/i,
        test: /\.(mp3|jpg|png)$/i,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "public", "index.html"),
      hash: true,
    }),
  ],
  devServer: {
    port: 3000,
  },
};
