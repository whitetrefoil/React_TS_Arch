import * as http from 'http'
import { map, noop } from 'lodash'
import * as webpack from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'
import { config } from '../config'
import { Deferred } from '../utils/deferred'
import { getLogger } from '../utils/log'
import devConfig from '../webpack/dev'

const logger = getLogger(__filename)

const WAIT_FOR_STARTUP_IN_MS = 30000
const WATCHER_STABILITY_THRESHOLD = 200
const WATCHER_RESTART_DELAY = 500

const extendedConfig = devConfig
extendedConfig.plugins = devConfig.plugins || []
extendedConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
extendedConfig.output.path = config.absOutput('')
extendedConfig.entry['polyfills'] = devConfig.entry['polyfills'] || []
extendedConfig.entry['polyfills']
  .unshift(`webpack-dev-server/client?http://${config.livereloadHost}:${config.serverPort}`
    , 'webpack/hot/dev-server')

const webpackCompiler = webpack(extendedConfig)
const webpackCompilerConfig = {
  publicPath: '',
  contentBase: config.absBuilding(''),
  hot: true,
  noInfo: false,
  // historyApiFallback: true,
  // quiet: false,
  // lazy: false,
  // watchOptions: {
  //   aggregateTimeout: 300,
  //   poll: true,
  // },
  // publicPath: '/assets/',
  // headers: { 'X-Custom-Header': 'yes' },
  stats: 'errors-only' as 'errors-only',
  proxy: [
    {
      context: map(config.apiPrefixes, (p: string): string => `${p}**`),
      target: `http://${config.livereloadHost}:${config.serverPort + 1}`,
      secure: false,
    },
  ],
  disableHostCheck: true,
}

async function verifyServer(): Promise<void> {
  const deferred = new Deferred()

  http.get({
    port: config.serverPort,
    timeout: WAIT_FOR_STARTUP_IN_MS,
  }, (res: http.IncomingMessage) => {
    res.on('data', noop)
    res.on('end', () => { deferred.resolve() })
  })
    .on('error', (getErr?: Error) => {
      logger.warn('There must be something wrong with webpack dev server:\n', getErr.message)
      deferred.reject(getErr)
    })

  return deferred.promise
}

export async function startWebpackDevServer(): Promise<void> {
  const server = new WebpackDevServer(webpackCompiler, webpackCompilerConfig)
  const deferred = new Deferred()

  const webpackServer = server.listen(config.serverPort, '0.0.0.0', (listenErr?: Error) => {
    if (listenErr) {
      logger.error('Webpack Dev Server startup failed!  Detail:\n', listenErr.message)
      return
    }
    logger.log(`Webpack Dev Server started at port ${config.serverPort}`)

  })

  verifyServer().then(deferred.resolve, deferred.reject)

  process.on('SIGINT', async() => {
    logger.log('Received SIGINT, stopping webpack server.')
    return new Promise((done) => {
      webpackServer.close(() => {
        logger.log('Webpack server stopped.')
        done()
      })
    })
  })

  return deferred.promise
}
