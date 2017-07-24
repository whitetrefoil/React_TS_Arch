import * as httpProxy from 'http-proxy'
import { config } from '../config'
import { getLogger } from '../utils/log'

const logger = getLogger(__filename)

export class DevServerProxy {
  server: httpProxy = null

  startProxy(proxyConfig: any): void {
    logger.log(`Building proxy to ${config.backendDest}`)
    this.server = httpProxy.createProxyServer(proxyConfig)
    this.server.on('error', console.warn)
  }

  stopProxy(callback?: () => void): void {
    if (this.server == null) {
      if (typeof callback === 'function') { callback() }
      return
    }
    this.server.close(callback)
  }
}

export const proxy = new DevServerProxy()

export function startProxy(): DevServerProxy {
  proxy.startProxy({
    target: config.backendDest,
    secure: false,
    xfwd: true,
    headers: {
      host: config.backendDest.replace(/^https?:\/\//, ''),
      origin: config.backendDest,
      referer: `${config.backendDest}/`,
    },
  })

  process.on('SIGINT', async() => {
    logger.log('Received SIGINT, stopping proxy server.')
    return new Promise((done) => {
      proxy.stopProxy(() => {
        logger.log('Backend proxy stopped.')
        done()
      })
    })
  })

  return proxy
}
