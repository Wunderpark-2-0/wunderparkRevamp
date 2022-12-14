const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
  // context: path.resolve(__dirname, 'client'),
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: 'bundle.js',
    // path: __dirname + '/src',
  },
  // browser: ['Chrome'],
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
  ],

  devServer: {
    historyApiFallback: true,

    static: {
      directory: path.join(__dirname, '/client'),
    },
    // proxy: {
    //   '/': 'http://localhost:3000',
    // },
    compress: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
};
