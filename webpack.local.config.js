const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const path = require('path');
<<<<<<< HEAD
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
=======
>>>>>>> b8f188b (增加PIR相关应用)

const baseConfig = require('./webpack.base.config');

const nodeModulesDir = path.resolve(__dirname, 'node_modules');

baseConfig.mode = 'development';

baseConfig.entry = [
<<<<<<< HEAD
=======
  'react-hot-loader/patch',
  'whatwg-fetch',
  '@babel/polyfill',
>>>>>>> b8f188b (增加PIR相关应用)
  './frontend/js/index.js',
];

baseConfig.optimization = {
  splitChunks: {
    chunks: 'all',
  },
<<<<<<< HEAD
  moduleIds: 'named'
=======
>>>>>>> b8f188b (增加PIR相关应用)
};

baseConfig.output = {
  path: path.resolve('./frontend/bundles/'),
<<<<<<< HEAD
  publicPath: 'http://localhost:3000/frontend/bundles/',
=======
  // publicPath: 'http://localhost:3000/frontend/bundles/',
  publicPath: 'http://103.140.229.162:3000/frontend/bundles/',
>>>>>>> b8f188b (增加PIR相关应用)
  filename: '[name].js',
};

baseConfig.module.rules.push(
  {
    test: /\.jsx?$/,
    exclude: [nodeModulesDir],
<<<<<<< HEAD
    use: {
      loader: require.resolve('babel-loader'),  
      options: {
        plugins: [require.resolve('react-refresh/babel')],
      },
    },
  },
  {
    test: /\.(woff(2)?|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
    type: 'asset/inline',
=======
    loader: require.resolve('babel-loader'),
  },
  {
    test: /\.(woff(2)?|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=100000',
>>>>>>> b8f188b (增加PIR相关应用)
  }
);

baseConfig.plugins = [
<<<<<<< HEAD
  new ReactRefreshWebpackPlugin(),
  new webpack.EvalSourceMapDevToolPlugin({
    exclude: /node_modules/
  }),
  new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
  new BundleTracker({
    path: __dirname,
    filename: 'webpack-stats.json',
=======
  new webpack.EvalSourceMapDevToolPlugin({
    exclude: /node_modules/
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
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
  new CircularDependencyPlugin({
    // exclude detection of files based on a RegExp
    exclude: /a\.js|node_modules/,
    // add errors to webpack instead of warnings
    failOnError: true,
    // set the current working directory for displaying module paths
    cwd: process.cwd(),
  }),
];

<<<<<<< HEAD
=======
baseConfig.resolve.alias = {
  'react-dom': '@hot-loader/react-dom',
};

>>>>>>> b8f188b (增加PIR相关应用)
module.exports = baseConfig;
