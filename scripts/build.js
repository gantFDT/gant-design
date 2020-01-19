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
  // if (!res) {
  //   Ora.fail(chalk.red(`gulp && webpack failed`))
  //   return
  // }
  console.log('res', res)
  Ora.succeed(chalk.green(`webpack successed!`))
  // Ora.text = chalk.cyan(`publishing official node package……\n`)
  // res = yield execCmd(`npm publish`)
  // if (!res) {
  //   Ora.fail(chalk.red(`
  //     publishing official node package failed \n 
  //     please check package Version or Authority!\n 
  //     1、maybe you have't login official npm\n
  //     2、maybe your package version repeat with online\n
  //     3、please confirm your registry = ‘https://registry.npmjs.org’
  //   `))
  //   console.log(npmLink);
  //   console.log(cnpmLink);
  //   console.log(gnpmLink);
  //   return
  // }
  // Ora.succeed(chalk.green(`official node package publish success!`))

  // //发公司包
  // let packageStr = fs.readFileSync(packageJsonPath)
  // const package = JSON.parse(packageStr)
  // package['publishConfig'] = {
  //   "registry": "https://nexus.gantcloud.com/repository/gant-npm-snapshot/"
  // }
  // let packageStrPrivate = JSON.stringify(package)
  // yield coFs.writeFile(packageJsonPath, packageStrPrivate);
  // const authStr = `registry=https://nexus.gantcloud.com/repository/gant-npm
  // _auth="bnBtOmFkbWluMTIz"
  // email=npm@gantcloud.com
  // always-auth=true`
  // yield coFs.writeFile(npmrcPath, authStr);
  // Ora.text = chalk.cyan(`publishing private node package……\n`)
  // res = yield execCmd(`npm publish`)
  // if (!res) {
  //   Ora.fail(chalk.red(`publishing private node package failed`))
  //   return
  // }
  // Ora.succeed(chalk.green(`private node package publish success!`))
  // yield coFs.writeFile(packageJsonPath, packageStr);
  // yield coFs.unlink(npmrcPath)
  Ora.stop()
})