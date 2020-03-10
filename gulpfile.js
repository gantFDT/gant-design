const { src, dest, series, task } = require('gulp')
const fs = require('fs')
const babel = require('gulp-babel')
const rimraf = require('rimraf')
const path = require('path')
const less = require('gulp-less')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const ts = require('gulp-typescript')
const filter = require('gulp-filter');
const through2 = require('through2')
const LessNpm = require('less-plugin-npm-import')
const babelConfig = require('./babelConfig.json')
const lernaConfig = require('./lerna.json')
const { all: packageNames } = lernaConfig;
const tsProject = ts.createProject('./tsconfig.json', {
  declaration: true,
  target: 'ES6',
});

// 获取路径下文件夹名数组
function getDirNames(__path) {
  return fs.readdirSync(__path, { withFileTypes: true })
    .filter(item=>item.isDirectory() && item.name !== 'style' && item.name !== 'compose')
    .map(item=>item.name);
}

function transToCamelCase(str) {
  const regex = /(?!^)([A-Z])/g;
  str = str.replace(regex, function($){
    return '-' + $.toLowerCase()
  })
  str = str[0].toLowerCase() + str.slice(1);
  return str;
}

function resolveDataCellPath(content, repeat = 1) {
  const regex = /import\s{0,}\{(.+)\}\s{0,}from\s{0,}[\'\"]@data\-cell[\'\"]/;
  const execs = regex.exec(content);
  if(!execs) return content;

  const dirs = execs[1].split(',').map(s => s.trim());

  let str2replace = '';
  dirs.forEach(dirName => {
    if(dirName)
      str2replace+=`import ${dirName} from '${'../'.repeat(repeat)}${transToCamelCase(dirName)}'\n`;
  })
  content = content.replace(regex, str2replace)

  return content;
}

function ScriptTask(dirName) {
  return series(
    function compileScript(){
      return src([`packages/${dirName}/src/**/*.tsx`, `packages/${dirName}/src/**/*.ts`])
        .pipe(tsProject())
        .pipe(dest(`packages/${dirName}/lib/`))
        .pipe(
          // 样式转成css
          through2.obj(function (chunk, enc, next) {
            let content = chunk.contents.toString()
            const buf = Buffer.from(content)
            const filePath = chunk.path;
            if(filePath.endsWith('style/index.d.ts')){
              fs.writeFileSync(filePath.replace('index', 'css'), buf)
            }
            this.push(chunk)
            next()
          })
        )
        .pipe(filter(file => !file.path.endsWith('.d.ts')))
        .pipe(src([`packages/${dirName}/src/**/*.jsx`, `packages/${dirName}/src/**/*.js`]))
        .pipe(
          // 处理DataCell路径问题
          through2.obj(function (chunk, enc, next) {
            let content = chunk.contents.toString()
            content = resolveDataCellPath(content)
            const buf = Buffer.from(content)
            chunk.contents = buf
            this.push(chunk)
            next()
          })
        )
        .pipe(babel(babelConfig))
        .pipe(
          // 处理@开头的路径解析问题
          through2.obj(function (chunk, enc, next) {
            let content = chunk.contents.toString()
            const filePath = chunk.path;
            packageNames.forEach((packageName) => {
              const _dirName = packageName.slice(9, -2);
              content = content.replace(new RegExp('@' + _dirName, 'g'), (dirName === 'gantd' ? _dirName : '../' + _dirName));
            })
            content = content.replace(/\.less/g, '.css')
            content = content.replace(/\.jsx/g, '.js')
            const buf = Buffer.from(content)
            chunk.contents = buf
            if(filePath.endsWith('style/index.js')){
              fs.writeFileSync(filePath.replace('index', 'css'), buf)
            }
            this.push(chunk)
            next()
          })
        )
        .pipe(dest(`packages/${dirName}/lib/`))
    },
    function copyJson() {
      return src(`packages/${dirName}/src/**/*.json`)
        .pipe(dest(`packages/${dirName}/lib/`))
    },
    function compileStyle() {
      return src(`packages/${dirName}/src/**/*.less`)
        .pipe(less({
          plugins: [
            new LessNpm({ prefix: '~' })
          ],
          javascriptEnabled: true,
        }))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest(`packages/${dirName}/lib/`))
    }
  )
}

// 把子包打到主包里面
function CopileToGantdTask(dirName, targetDir) {
  const __dirName = dirName.slice(0, -2); // eg: data-cell
  return series(
    function cleanGantd(cb) {
      if(__dirName === 'data-cell'){
        const dataCellDirs = getDirNames(path.resolve(__dirname, `packages/data-cell-g/src/`));
        dataCellDirs.forEach(___dirName => {
          rimraf.sync(path.resolve(__dirname, `packages/gantd/${targetDir}/${___dirName}/`));
        })
      }else if(__dirName === 'color-picker'){
        rimraf.sync(path.resolve(__dirname, `packages/gantd/${targetDir}/_color-picker/`));
      }else{
        rimraf.sync(path.resolve(__dirname, `packages/gantd/${targetDir}/${__dirName}/`));
      }
      cb();
    },
    function compileScriptToGantd(){
      return src([`packages/${dirName}/src/**/*.tsx`, `packages/${dirName}/src/**/*.ts`])
        .pipe(tsProject())
        .pipe(dest(`packages/gantd/${targetDir}/${__dirName === 'data-cell' ? '' : (__dirName + '/')}`))
        .pipe(
          // 样式转成css
          through2.obj(function (chunk, enc, next) {
            let content = chunk.contents.toString()
            const buf = Buffer.from(content)
            const filePath = chunk.path;
            if(filePath.endsWith('style/index.d.ts')){
              fs.writeFileSync(filePath.replace('index', 'css'), buf)
            }
            this.push(chunk)
            next()
          })
        )
        .pipe(filter(file => !file.path.endsWith('.d.ts')))
        .pipe(src([`packages/${dirName}/src/**/*.jsx`, `packages/${dirName}/src/**/*.js`]))
          .pipe(
          // 处理路径等问题
          through2.obj(function (chunk, enc, next) {
            let content = chunk.contents.toString()
            const filePath = chunk.path;
            const Idx = filePath.indexOf(__dirName);
            const filelevel = filePath.slice(Idx).split('/').length;
            content = resolveDataCellPath(content, dirName === 'smart-table-g' ? (filelevel - 1) : 1)
            const buf = Buffer.from(content)
            chunk.contents = buf
            this.push(chunk)
            next()
          })
        )
        .pipe(babel(babelConfig))
        .pipe(
          // 处理路径等问题
          through2.obj(function (chunk, enc, next) {
            let content = chunk.contents.toString()
            const filePath = chunk.path;
            const Idx = filePath.indexOf(__dirName);
            const filelevel = filePath.slice(Idx).split('/').length;
            const pathPrefix =
              __dirName === 'gantd' ? '' :
              __dirName === 'smart-table' ? '../'.repeat(filelevel-1) : '../';

            content = content.replace(/\.less/g, '.css')
            content = content.replace(/\.jsx/g, '.js')

            packageNames.forEach((packageName) => {
              const _dirName = packageName.slice(9, -2);
              if(_dirName === 'color-picker'){
                if(filePath.endsWith('style/index.js')){
                  content = content.replace(new RegExp('@' + _dirName, 'g'), pathPrefix + '../_color-picker');
                }else{
                  content = content.replace(new RegExp('@' + _dirName, 'g'), pathPrefix + '_color-picker');
                }
              }else{
                content = content.replace(new RegExp('@' + _dirName, 'g'), pathPrefix + _dirName);
              }
            })
            const buf = Buffer.from(content)
            chunk.contents = buf
            if(filePath.endsWith('style/index.js')){
              fs.writeFileSync(filePath.replace('index', 'css'), buf)
            }
            this.push(chunk)
            next()
          })
        )
        .pipe(dest(`packages/gantd/${targetDir}/${__dirName === 'data-cell' ? '' : (__dirName + '/')}`))
    },
    function copyJsonToGantd() {
      return src(`packages/${dirName}/src/**/*.json`)
      .pipe(dest(`packages/gantd/${targetDir}/${__dirName === 'data-cell' ? '' : (__dirName + '/')}`))
    },
    function compileStyleToGantd(cb) {
      return src(`packages/${dirName}/src/**/*.less`)
        .pipe(less({
          plugins: [
            new LessNpm({ prefix: '~' })
          ],
          javascriptEnabled: true,
        }))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest(`packages/gantd/${targetDir}/${__dirName === 'data-cell' ? '' : (__dirName + '/')}`))
    },
    function renameColorPicker(cb) {
      if (__dirName === 'color-picker') {
        fs.rename('packages/gantd/lib/color-picker/', 'packages/gantd/lib/_color-picker/', cb)
      }else{
        cb()
      }
    }
  )
}

packageNames.forEach(packageName => {
  const dirName = packageName.slice(9);
  task(`lib:${dirName}`, series(
    function clean(cb) {
      rimraf.sync(path.resolve(__dirname, `${packageName}/lib/`));
      cb();
    },
    ScriptTask(dirName),
    dirName !== 'gantd' ? CopileToGantdTask(dirName, 'lib') : function skipGant(cb) { cb() }
  ))
})

task('lib', series(
  ...packageNames.map(packageName => `lib:${packageName.slice(9)}`)
))

task('clean', function clean(cb) {
  rimraf.sync(path.resolve(__dirname, `packages/*/lib/`));
  rimraf.sync(path.resolve(__dirname, `packages/*/link/`));
  rimraf.sync(path.resolve(__dirname, `packages/*/dist/`));
  cb();
})

task('default', series('clean', 'lib'))