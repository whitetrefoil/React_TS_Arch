import * as chalk from 'chalk'
import * as meow from 'meow'
import * as path from 'path'
import { getLogger } from './utils/log'

// region - Interfaces

interface IFlags {
  development: boolean
  port: string
  prefix: string
  index: string
  livereload: string
  ping: string
  backend: string
}

interface IMeowResult extends meow.Result {
  flags: IFlags
}

interface IConfig {
  isInitialized: boolean
  argv?: IMeowResult
  pkg?: any
  serverPort?: number
  apiPrefixes?: string[]
  serverIndex?: string
  livereloadHost?: string
  ping?: number
  backendDest?: string

  root?(...pathInRoot: string[]): string

  absRoot?(...pathInRoot: string[]): string

  source?(...pathInSource: string[]): string

  absSource?(...pathInSource: string[]): string

  building?(...pathInBuilding: string[]): string

  absBuilding?(...pathInBuilding: string[]): string

  output?(...pathInOutput: string[]): string

  absOutput?(...pathInOutput: string[]): string

  outputByEnv?(...pathInOutput: string[]): string

  absOutputByEnv?(...pathInOutput: string[]): string
}

// endregion

// region - Default constants

const DEFAULT_IS_DEVELOPMENT = false
const DEFAULT_PORT = 8888
const DEFAULT_PREFIX = '/Channel/,/data/,/crm/'
const DEFAULT_INDEX = 'index.html'
const DEFAULT_PING = 0
const DEFAULT_LIVERELOAD = 'localhost'
const DEFAULT_BACKEND = 'http://localhost:8091'
const DEFAULT_BACKEND_HTTPS = false

const DEFAULT_BUILDING_DIR = '.building'
const DEFAULT_OUTPUT_DIR = 'dist'
const DEFAULT_SOURCE_BASE_DIR = 'src'

// endregion

const logger = getLogger(__filename)

const argv = meow(
  `
    Usage:
      $ npm ${chalk.yellow('<task>')} -- ${chalk.yellow('<options>')}

    Tasks:
      run server           start preview server
      start                alias of "run server"
      test                 run tests
      run coverage         generate coverage report
      run build            build the source code

    Options:                                                     [${chalk.gray('default value')}]
      common:
        -h, --help         show this help message
        -d, --development  set NODE_ENV to "development"         [${chalk.yellow('false')}]
      developing:
        -p, --port         port of preview server                [${chalk.blue('8888')}]
        -x, --prefix       prefix to determine backend requests  [${chalk.green('"/Channel/,/data/,/crm/"')}]
                           can use ',' to specify multiple ones
        -i, --index        index page of preview server          [${chalk.green('"index.html"')}]
        -l, --livereload   the hostname in livereload script     [${chalk.green('"localhost"')}]
        --ping             emulate the network delay (ms)        [${chalk.blue('0')}]
        -e, --backend      start the server in integration mode  [${chalk.green('"http://localhost:8091"')}]
                           can specify the destination

    For more detail of tasks / options, see code in "dev/gulp" directory.
  `,
  {
    boolean: ['help', 'development'],
    string: ['index', 'prefix', 'livereload', 'ping', 'backend'],
    alias: {
      h: 'help',
      d: 'development',
      p: 'port',
      x: 'prefix',
      i: 'index',
      l: 'livereload',
      e: 'backend',
    },
    default: {
      development: DEFAULT_IS_DEVELOPMENT,
      port: DEFAULT_PORT,
      prefix: DEFAULT_PREFIX,
      index: DEFAULT_INDEX,
      livereload: DEFAULT_LIVERELOAD,
      ping: DEFAULT_PING,
    },
  },
) as IMeowResult

export class ConfigNotInitializedError extends Error {
  isConfigNotInitializedError = true
}

const root = path.join(__dirname, '..')
const source = DEFAULT_SOURCE_BASE_DIR
const building = DEFAULT_BUILDING_DIR
const output = DEFAULT_OUTPUT_DIR

export const config: IConfig = {
  isInitialized: false,
}

config.root = (...pathInRoot) =>
  path.join(root, ...pathInRoot)

config.absRoot = config.root

config.source = (...pathInSource) =>
  path.join(source, ...pathInSource)

config.absSource = (...pathInSource) =>
  config.root(source, ...pathInSource)

config.building = (...pathInBuilding) =>
  path.join(building, ...pathInBuilding)

config.absBuilding = (...pathInBuilding) =>
  config.root(building, ...pathInBuilding)

config.output = (...pathInOutput) =>
  path.join(output, ...pathInOutput)

config.absOutput = (...pathInOutput) =>
  config.root(output, ...pathInOutput)

config.outputByEnv = (...pathInOutput) => {
  const dir = process.env.NODE_ENV === 'production' ? output : building
  return path.join(dir, ...pathInOutput)
}

config.absOutputByEnv = (...pathInOutput) => {
  const dir = process.env.NODE_ENV === 'production' ? output : building
  return config.root(dir, ...pathInOutput)
}

export function initialize() {

  if (config.isInitialized) {
    // tslint:disable-next-line:no-console
    logger.warn(`Project has already been initialized.  Newer settings will be ignored.`)
    return
  }

  config.argv = argv

  config.pkg = argv.pkg || {}

  if (typeof process.env.NODE_ENV !== 'string') {
    process.env.NODE_ENV = (argv.flags.development || DEFAULT_IS_DEVELOPMENT)
      ? 'development' : 'production'
  }
  process.env.BABEL_ENV = process.env.NODE_ENV

  logger.log(`Initializing project in "${root}"`)

  logger.log(`Running under "${process.env.NODE_ENV}" environment.`)

  config.serverPort = parseInt(argv.flags.port, 10)

  config.apiPrefixes = argv.flags.prefix.split(',')

  config.serverIndex = argv.flags.index

  config.livereloadHost = argv.flags.livereload

  config.ping = parseInt(argv.flags.ping, 10)

  config.backendDest = argv.flags.backend === '' ? DEFAULT_BACKEND : argv.flags.backend

  config.isInitialized = true
}
