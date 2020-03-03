const { src, dest, series, parallel, task } = require('gulp')
const babel = require('gulp-babel')
const rimraf = require('rimraf')
const path = require('path')
const less = require('gulp-less')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const ts = require('gulp-typescript')
const through2 = require('through2')
const LessNpm = require('less-plugin-npm-import')
const babelConfig = require('./babelConfig.json')
const lernaConfig = require('./lerna.json')
const { all: packageNames } = lernaConfig;
const tsProject = ts.createProject('./tsconfig.json', {});

/**
 * 解析包引用路径
 * @param {*} content 待转换内容
 * @param {*} level 文件嵌套层级
 * @returns 转换后内容
 */
function resolvePath(content, level) {
  packageNames.forEach((packageName) => {
    const dirName = packageName.slice(9);
    if (level) {
      content = content.replace(new RegExp('@' + dirName.slice(0, -2), 'g'), '../'.repeat(level) + dirName + '/link');
    } else {
      content = content.replace(new RegExp('@' + dirName.slice(0, -2) + '/', 'g'), dirName + '/lib/');
      content = content.replace(new RegExp('@' + dirName.slice(0, -2), 'g'), dirName);
    }
  })
  return content;
}

function linkScriptTask(dirName) {
  return series(
    function compileJsLevelOne(){
      return src([`packages/${dirName}/src/*.jsx`, `packages/${dirName}/src/*.js`])
        .pipe(babel(babelConfig))
        .pipe(
          // 处理路径等问题
          through2.obj(function (chunk, enc, next) {
            let content = chunk.contents.toString()
            content = resolvePath(content, 2)
            const buf = Buffer.from(content)
            chunk.contents = buf
            this.push(chunk)
            next()
          })
        )
        .pipe(dest(`packages/${dirName}/link/`))
    },
    function compileJsLevelTwo(){
      return src([`packages/${dirName}/src/*/*.jsx`, `packages/${dirName}/src/*/*.js`])
        .pipe(babel(babelConfig))
        .pipe(
          // 处理路径等问题
          through2.obj(function (chunk, enc, next) {
            let content = chunk.contents.toString()
            content = resolvePath(content, 3)
            const buf = Buffer.from(content)
            chunk.contents = buf
            this.push(chunk)
            next()
          })
        )
        .pipe(dest(`packages/${dirName}/link/`))
    },
    function compileTsLevelOne() {
      return src([`packages/${dirName}/src/*.tsx`, `packages/${dirName}/src/*.ts`])
        .pipe(tsProject())
        .pipe(
          // 处理路径等问题
          through2.obj(function (chunk, enc, next) {
            let content = chunk.contents.toString()
            content = resolvePath(content, 2)
            content = content.replace(/\.less/g, '.css')
            content = content.replace(/\.jsx/g, '.js')
            const buf = Buffer.from(content)
            chunk.contents = buf
            this.push(chunk)
            next()
          })
        )
        .pipe(dest(`packages/${dirName}/link/`))
    },
    function compileTsLevelTwo() {
      return src([`packages/${dirName}/src/*/*.tsx`, `packages/${dirName}/src/*/*.ts`])
        .pipe(tsProject())
        .pipe(
          // 处理路径等问题
          through2.obj(function (chunk, enc, next) {
            let content = chunk.contents.toString()
            content = resolvePath(content, 3)
            content = content.replace(/\.less/g, '.css')
            content = content.replace(/\.jsx/g, '.js')
            const buf = Buffer.from(content)
            chunk.contents = buf
            this.push(chunk)
            next()
          })
        )
        .pipe(dest(`packages/${dirName}/link/`))
    },
    function copyJson() {
      return src(`packages/${dirName}/src/**/*.json`)
        .pipe(dest(`packages/${dirName}/link/`))
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
        .pipe(dest(`packages/${dirName}/link/`))
    }
  )
}

function libScriptTask(dirName) {
  return parallel(
    function compileJs(){
      return src([`packages/${dirName}/src/**/*.jsx`, `packages/${dirName}/src/**/*.js`])
        .pipe(babel(babelConfig))
        .pipe(
          // 处理路径等问题
          through2.obj(function (chunk, enc, next) {
            let content = chunk.contents.toString()
            content = resolvePath(content)
            const buf = Buffer.from(content)
            chunk.contents = buf
            this.push(chunk)
            next()
          })
        )
        .pipe(dest(`packages/${dirName}/lib/`))
    },
    function compileTs() {
      return src([`packages/${dirName}/src/**/*.tsx`, `packages/${dirName}/src/**/*.ts`])
        .pipe(tsProject())
        .pipe(
          // 处理路径等问题
          through2.obj(function (chunk, enc, next) {
            let content = chunk.contents.toString()
            content = resolvePath(content)
            content = content.replace(/\.less/g, '.css')
            content = content.replace(/\.jsx/g, '.js')
            const buf = Buffer.from(content)
            chunk.contents = buf
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

packageNames.forEach(packageName => {
  const dirName = packageName.slice(9);
  task(`lib:${dirName}`, series(
    function clean(cb) {
      rimraf.sync(path.resolve(__dirname, `${packageName}/lib/`));
      cb();
    },
    libScriptTask(dirName)
  ))
  task(`link:${dirName}`, series(
    function clean(cb) {
      rimraf.sync(path.resolve(__dirname, `${packageName}/link/`));
      cb();
    },
    linkScriptTask(dirName)
  ))
})

task('lib', series(
  function cleanLibs(cb) {
    rimraf.sync(path.resolve(__dirname, `packages/*/lib/`));
    cb();
  },
  ...packageNames.map(packageName => {
    const dirName = packageName.slice(9);
    return libScriptTask(dirName)
  })
))

task('link', series(
  function cleanLinks(cb) {
    rimraf.sync(path.resolve(__dirname, `packages/*/link/`));
    cb();
  },
  ...packageNames.map(packageName => {
    const dirName = packageName.slice(9);
    return linkScriptTask(dirName)
  })
))

task('default', series(
  function clean(cb) {
    rimraf.sync(path.resolve(__dirname, `packages/*/lib/`));
    rimraf.sync(path.resolve(__dirname, `packages/*/link/`));
    rimraf.sync(path.resolve(__dirname, `packages/gantd/dist/`));
    cb();
  },
  ...packageNames.map(async packageName => {
    const dirName = packageName.slice(9);
    await libScriptTask(dirName);
    return linkScriptTask(dirName);
  })
))