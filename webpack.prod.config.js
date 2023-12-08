const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleTracker = require('webpack-bundle-tracker');
const path = require('path');

const baseConfig = require('./webpack.base.config');

const nodeModulesDir = path.resolve(__dirname, 'node_modules');

baseConfig.mode = 'production';
baseConfig.devtool = 'source-map';

<<<<<<< HEAD
baseConfig.entry = ['./frontend/js/index.js'];
=======
baseConfig.entry = [
  'whatwg-fetch', 
  '@babel/polyfill', 
  './frontend/js/index.js'
];
>>>>>>> b8f188b (增加PIR相关应用)

baseConfig.output = {
  path: path.resolve('./frontend/webpack_bundles/'),
  publicPath: '/static/webpack_bundles/',
  filename: '[name]-[hash].js',
};

baseConfig.module.rules.push(
  {
    test: /\.jsx?$/,
    exclude: [nodeModulesDir],
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    },
  },
  {
    test: /\.(woff(2)?|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
<<<<<<< HEAD
    type: 'asset/resource'
=======
    loader: 'file-loader?name=fonts/[name].[ext]',
>>>>>>> b8f188b (增加PIR相关应用)
  }
);

baseConfig.optimization = {
  minimize: true,
  splitChunks: {
    chunks: 'all',
  },
};

baseConfig.plugins = [
  new webpack.DefinePlugin({
    // removes React warnings
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
<<<<<<< HEAD
  new MiniCssExtractPlugin({ filename: '[name]-[hash].css' }),
  new BundleTracker({
    path: __dirname,
    filename: 'webpack-stats.json',
=======
  new MiniCssExtractPlugin({ filename: '[name]-[hash].css', disable: false, allChunks: true }),
  new BundleTracker({
    filename: './webpack-stats.json',
>>>>>>> b8f188b (增加PIR相关应用)
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: [autoprefixer],
    },
  }),
];

module.exports = baseConfig;
