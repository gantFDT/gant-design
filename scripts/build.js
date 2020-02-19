const co = require('co');
const fs = require('fs');
const path = require('path')
const chalk = require('chalk');
const { execCmd } = require('./utils')
const ora = require('ora');

const Ora = ora()

let pkgs = fs.readdirSync(path.join(__dirname, '../packages'),{withFileTypes:true})
  .filter(item=>item.isDirectory())
  .map(item=>item.name);

co(function* () {
  Ora.text = chalk.cyan(`webpacking……\n`)
  Ora.start()
  res = yield Promise.all(pkgs.map(pkgName => execCmd(`cd ${path.join(__dirname, '../packages', pkgName)} && webpack`)))
  if(res.some)
  console.log(res)
  Ora.succeed(chalk.green(`共${res.length}个包，成功${res.filter(R => R).length}个，失败${res.filter(R => !R).length}个。`))
  Ora.stop()
})