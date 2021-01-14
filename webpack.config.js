const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const config = (_, {mode}) => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
    publicPath : ''
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    host: '192.168.0.100'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          mode === "production" ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(svg|jpg|gif|png)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]'
        }    
        
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [  
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ]
        ]
      }
    })
  ]
});

module.exports = config;