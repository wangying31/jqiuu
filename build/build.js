'use strict'
require('./check-versions')()
require('shelljs/global')

process.env.NODE_ENV = 'production'

const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

console.log(chalk.yellow(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
))

const spinner = ora('building for production...')
spinner.start()

const assetsRoot = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsRoot)
mkdir('-p', assetsRoot)
cp('-R', 'static/*', assetsRoot)

webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
})
