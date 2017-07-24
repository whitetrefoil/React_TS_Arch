import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as LodashPlugin from 'lodash-webpack-plugin'
import * as webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { config, initialize } from '../config'
import { entries } from './configs/entries'
import { htmlWebpackPlugin } from './configs/html-webpack-plugin'

if (config.isInitialized !== true) {
  initialize()
}

const SIZE_14KB = 14336

const prodConfig: webpack.Configuration = {

  context: config.absSource(''),

  entry: entries,

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  output: {
    path: config.absOutput(''),
    publicPath: '/',
    filename: 'js/[name]-[chunkHash].js',
    chunkFilename: 'js/chunks/[id]-[chunkHash].chunk.js',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'awesome-typescript-loader?failOnHint',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize&safe&camelCase&importLoaders=2',
          ],
        }),
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize&safe&camelCase&importLoaders=1',
            'less-loader?sourceMap&noIeCompat',
          ],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        exclude: /(weixin|qr-)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // limit for base64 inlining in bytes
              limit: SIZE_14KB,
              // custom naming format if file is larger than
              // the threshold
              name: 'assets/[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /(weixin|qr-).*\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[hash].[ext]',
          },
        }],
      },
    ],
  },

  plugins: [
    // Refer to: https://github.com/lodash/lodash-webpack-plugin
    new LodashPlugin(),
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
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'gzip',
      openAnalyzer: false,
      reportFilename: '../test_results/bundle-analysis-report.html',
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name]-[contenthash].css',
      allChunks: true,
    }),
  ],
}

export default prodConfig