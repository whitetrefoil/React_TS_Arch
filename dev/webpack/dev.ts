import * as LodashPlugin from 'lodash-webpack-plugin'
import * as webpack from 'webpack'
import { config, initialize } from '../config'
import { entries } from './configs/entries'
import { htmlWebpackPlugin } from './configs/html-webpack-plugin'
import { sassLoader, scssLoader } from './configs/sass'

if (config.isInitialized !== true) {
  initialize()
}

const devConfig: webpack.Configuration = {

  devtool: 'source-map',

  context: config.absSource(''),

  entry: entries,

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  output: {
    path: config.absBuilding(''),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id]-[name].chunk.js',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.[jt]sx?$/,
        use: ['source-map-loader'],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: ['tslint-loader'],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: ['eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          'awesome-typescript-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap&modules&camelCase',
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader?sourceMap&modules&camelCase&importLoaders=2',
          'resolve-url-loader?sourceMap',
          sassLoader,
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader?sourceMap&modules&camelCase&importLoaders=2',
          'resolve-url-loader?sourceMap',
          scssLoader,
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        exclude: /(weixin|qr-)/,
        use: ['url-loader'],
      },
      {
        test: /(weixin|qr-).*\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    // Refer to: https://github.com/lodash/lodash-webpack-plugin
    new LodashPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['index', 'vendor', 'polyfills'],
    }),
    htmlWebpackPlugin,
  ],

  performance: {
    hints: false,
  },
}

export default devConfig
