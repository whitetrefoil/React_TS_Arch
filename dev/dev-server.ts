import { config } from './config'
import { startBackend } from './dev-server/backend'
import { startWebpackDevServer } from './dev-server/webpack'
import { startProxy, DevServerProxy } from './dev-server/proxy'

export async function startDevServer(): Promise<void[]> {
  let proxy: DevServerProxy

  if (config.backendDest != null) {
    proxy = startProxy()
    return await Promise.all([startBackend(proxy), startWebpackDevServer()])
  }

  return await Promise.all([startBackend(), startWebpackDevServer()])
}

startDevServer()
  .catch((err) => { throw err })
