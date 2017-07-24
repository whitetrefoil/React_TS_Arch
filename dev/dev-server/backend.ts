import * as bodyparser from 'body-parser'
import * as connect from 'connect'
import { IncomingMessage, ServerResponse } from 'http'
import * as _ from 'lodash'
import * as msm from 'mock-server-middleware'
import * as serveStatic from 'serve-static'
import { config } from '../config'
import { Deferred } from '../utils/deferred'
import { getLogger } from '../utils/log'
import { DevServerProxy } from './proxy'

const logger = getLogger(__filename)

function proxyMiddlewareFactory(httpProxy: any): connect.HandleFunction {
  return (req: IncomingMessage, res: ServerResponse, next: Function) => {
    if (_.every(config.apiPrefixes, (p) => req.url.indexOf(p) !== 0)) {
      next()
      return
    }
    httpProxy.web(req, res)
  }
}

function useMsm(app: connect.Server): void {
  msm.initialize({
    apiPrefixes: config.apiPrefixes,
    apiDir: 'stubapi/',
    lowerCase: true,
    ping: config.ping,
    preserveQuery: false,
  })
  app.use(msm.middleware)
}

function useProxy(app: connect.Server, proxy: DevServerProxy): void {
  app.use(proxyMiddlewareFactory(proxy.server))
}

export async function startBackend(proxy?: DevServerProxy): Promise<void> {
  const app = connect()
  const deferred = new Deferred()

  app.use(bodyparser.json())
  app.use(serveStatic(config.absSource('')))

  if (proxy == null) {
    logger.log('Using StubAPI mode.')
    useMsm(app)
  } else {
    logger.log('Existing proxy server found, will use proxy mode.')
    useProxy(app, proxy)
  }

  const port = config.serverPort + 1
  logger.log(`Starting backend server on port: ${port}.`)

  const server = app.listen(config.serverPort + 1, '0.0.0.0', (error: Error) => {
    if (error != null) { deferred.reject(error) }
    deferred.resolve()
  })

  process.on('SIGINT', async() => {
    logger.log('Received SIGINT, stopping backend server.')
    return new Promise((done) => {
      server.close(() => {
        logger.log('Backend server stopped.')
        done()
      })
    })
  })

  return deferred.promise
}
