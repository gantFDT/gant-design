const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

class ChunkDistFilesPlugin {
  
  constructor() {

  }

  apply(compiler) {
    compiler.hooks.done.tap('ChunkDistFilesPlugin', compilation => {
      let fileNames = fs.readdirSync(path.join(__dirname, '../dist/'), {withFileTypes: true}).map(V => V.name);
      fileNames.forEach(__filename => {
        const projectName = __filename.split('.')[0];
        const targetDir = path.join(__dirname, `../packages/${projectName}/dist/`);
        fs.mkdirSync(targetDir, { recursive: true })
        fs.copyFileSync(path.join(__dirname, `../dist/${__filename}`), `${targetDir}${__filename}`)
      })
      rimraf.sync(path.join(__dirname, '../dist/'))
    });
  }
}

module.exports = ChunkDistFilesPlugin;