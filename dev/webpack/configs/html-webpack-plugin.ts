import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as _ from 'lodash'
import { entries } from './entries'

function sortChunks(chunk1: HtmlWebpackPlugin.Chunk, chunk2: HtmlWebpackPlugin.Chunk) {
  const index = _.keys(entries)
  const a = index.indexOf(chunk1.names[0])
  const b = index.indexOf(chunk2.names[0])
  return a - b
}

export const htmlWebpackPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './index.html',
  chunks: ['polyfills', 'vendor', 'index'],
  hash: false,
  minify: false,
  inject: 'body',
  chunksSortMode: sortChunks,
})
