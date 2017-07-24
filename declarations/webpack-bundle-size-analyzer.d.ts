declare module 'webpack-bundle-size-analyzer' {
  import * as webpack from 'webpack'
  export class WebpackBundleSizeAnalyzerPlugin extends webpack.Plugin {
    constructor(outputPath: string)
  }
}
