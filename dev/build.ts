import * as del from 'del'
import * as fs from 'fs-extra'
import * as webpack from 'webpack'
import { config } from './config'
import { defer } from './utils/deferred'
import { getLogger } from './utils/log'
import devConfig from './webpack/dev'
import prodConfig from './webpack/prod'

const logger = getLogger(__filename)

const webpackConfig = process.env.NODE_ENV === 'development'
  ? devConfig
  : prodConfig

async function copyDataFiles() {
  logger.log('Copying data files...')
  return fs.copy(config.source('data'), config.output('data'))
}

async function startBuilding() {
  await del([config.outputByEnv('')])

  const deferred = defer()

  logger.log('Starting webpack...')

  webpack(webpackConfig, async(err: Error, stats: any) => {
    if (err != null) { return deferred.reject(err) }
    logger.log('[webpack]:\n', stats.toString({
      modules: false,
    }))
    await copyDataFiles()
    logger.log('Done!')
    deferred.resolve()
  })

  return deferred.promise
}

startBuilding()
  .catch((err) => { throw err })
