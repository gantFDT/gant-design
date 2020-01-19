const co = require('co');
const coFs = require('co-fs');
const fs = require('fs');
const path = require('path')
const chalk = require('chalk');
const { execCmd } = require('./utils')
const ora = require('ora');
const terminalLink = require('terminal-link');

const Ora = ora()
const packageJsonPath = path.join(__dirname, '../package.json')
const npmrcPath = path.join(__dirname, '../.npmrc')
const npmLink = chalk.green(terminalLink('官方npm', 'https://www.npmjs.com/package/gantd'))
const cnpmLink = chalk.green(terminalLink('淘宝cnpm', 'htttps://npm.taobao.org/package/gantd'))
const gnpmLink = chalk.green(terminalLink('公司gnpm', 'http://nexus.gantcloud.com/#browse/browse:gant-npm:gantd%2Fgantd-1.0.48.tgz'))
let res

co(function* () {
  //发官方包
  Ora.text = chalk.cyan(`gulping && webpacking……\n`)
  Ora.start()
  res = yield execCmd(`gulp && webpack`)
  if (!res) {
    Ora.fail(chalk.red(`gulp && webpack failed`))
    return
  }
  Ora.succeed(chalk.green(`gulp && webpack successed!`))
  Ora.text = chalk.cyan(`publishing official node package……\n`)
  res = yield execCmd(`npm publish`)
  if (!res) {
    Ora.fail(chalk.red(`
      publishing official node package failed \n 
      please check package Version or Authority!\n 
      1、maybe you have't login official npm\n
      2、maybe your package version repeat with online\n
      3、please confirm your registry = ‘https://registry.npmjs.org’
    `))
    console.log(npmLink);
    console.log(cnpmLink);
    console.log(gnpmLink);
    return
  }
  Ora.succeed(chalk.green(`official node package publish success!`))

  //发公司包
  let packageStr = fs.readFileSync(packageJsonPath)
  const package = JSON.parse(packageStr)
  package['publishConfig'] = {
    "registry": "https://nexus.gantcloud.com/repository/gant-npm-snapshot/"
  }
  let packageStrPrivate = JSON.stringify(package)
  yield coFs.writeFile(packageJsonPath, packageStrPrivate);
  const authStr = `registry=https://nexus.gantcloud.com/repository/gant-npm
  _auth="bnBtOmFkbWluMTIz"
  email=npm@gantcloud.com
  always-auth=true`
  yield coFs.writeFile(npmrcPath, authStr);
  Ora.text = chalk.cyan(`publishing private node package……\n`)
  res = yield execCmd(`npm publish`)
  if (!res) {
    Ora.fail(chalk.red(`publishing private node package failed`))
    return
  }
  Ora.succeed(chalk.green(`private node package publish success!`))
  yield coFs.writeFile(packageJsonPath, packageStr);
  yield coFs.unlink(npmrcPath)
  Ora.stop()
})