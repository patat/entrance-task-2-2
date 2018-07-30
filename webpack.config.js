const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, options) => {
  const devMode = options.mode !== 'production';

  let config = {
    entry: { main: './src/index.js' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: devMode ? 'main.js' : '[name].[hash].js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'src', 'templates'),
      watchContentBase: true,
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
            {
              loader: 'postcss-loader'
            }
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                context: 'src'
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          use: [
            'svg-sprite-loader',
            'svgo-loader'
          ]
        },
        {
          test: /\.html/,
          use: {
            loader: 'ejs-loader'
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin('dist', {} ),
      new HtmlWebpackPlugin({
        inject: false,
        template: path.resolve(__dirname, 'src', 'templates', 'index.html'),
        filename: 'index.html',
        production: !devMode,
        title: 'Яндекс Дом'
      })
    ],
  };

  if (devMode) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  } else {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      })
    );
  }

  return config;
};