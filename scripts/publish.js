const co = require('co');
const chalk = require('chalk');
const { execCmd } = require('./utils')
const ora = require('ora');

const Ora = ora()
const npmLink = chalk.green('官方npm', 'https://www.npmjs.com/package/gantd')
const cnpmLink = chalk.green('淘宝cnpm', 'htttps://npm.taobao.org/package/gantd')
const gnpmLink = chalk.green('公司gnpm', 'http://nexus.gantcloud.com/#browse/browse:gant-npm:gantd%2Fgantd-1.0.48.tgz')
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
  res = yield execCmd(`lerna publish`)
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
  Ora.stop()
})