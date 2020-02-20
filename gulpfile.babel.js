const { src, dest, series, parallel } = require('gulp')
const babel = require('gulp-babel')
const fs = require('fs')
const rimraf = require('rimraf')
const path = require('path')
const less = require('gulp-less')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const ts = require('gulp-typescript')
const through2 = require('through2')
const LessNpm = require('less-plugin-npm-import')
const babelConfig = require('./babelConfig.json')

function clean(cb) {
  rimraf.sync(path.resolve(__dirname, 'packages/*/lib/'))
  cb()
}

let pkgs = fs.readdirSync(path.join(__dirname, 'packages'),{withFileTypes:true})
  .filter(item=>item.isDirectory()&&item.name !== 'gantd')
  .map(item=>item.name);

/**
 * 编译非gantd包的js文件
 * @param {*} dirName 文件夹名
 */
const jstask = function (dirName) {
  return src([`packages/${dirName}/src/*.jsx`, `packages/${dirName}/src/*.js`])
    .pipe(babel(babelConfig))
    .pipe(
      // 处理路径等问题
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = content.replace(/\.less/g, '.css')
        content = content.replace(/\.jsx/g, '.js')
        content = content.replace(/@gantd/g, 'gantd/lib')
        content = content.replace(/@util-g/g, 'util-g')
        const buf = Buffer.from(content)
        chunk.contents = buf
        this.push(chunk)
        next()
      })
    )
    .pipe(dest(`packages/${dirName}/lib/`))
    .pipe(
      // 复制到gantd文件夹里面的时候处理路径等问题
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = content.replace(/gantd\/lib/g, '..')
        content = content.replace(/util\-g/g, '../util')
        const buf = Buffer.from(content)
        chunk.contents = buf
        this.push(chunk)
        next()
      })
    )
    .pipe(dest(`packages/gantd/lib/${dirName.slice(0, -2).replace(/\-/g,'')}/`))
}

const tstask = function (dirName) {
  src([`packages/${dirName}/src/*.tsx`, `packages/${dirName}/src/*.ts`])
    .pipe(
      ts({
        allowJs: false,
        target: 'ES5',
        declaration: true
      })
    )
    .pipe(babel(babelConfig))
    .pipe(
      // 处理路径等问题
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = content.replace(/\.less/g, '.css')
        content = content.replace(/\.jsx/g, '.js')
        const buf = Buffer.from(content)
        chunk.contents = buf
        this.push(chunk)
        next()
      })
    )
    .pipe(dest(`packages/${dirName}/lib/`))

  src([`packages/${dirName}/src/*.tsx`, `packages/${dirName}/src/*.ts`])
    .pipe(
      ts({
        allowJs: false,
        target: 'ES5',
        declaration: true
      })
    )
    .pipe(dest(`packages/${dirName}/lib/`))
    .pipe(
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = content.replace(/\.\.\/\.\.\/gantd\/src/g, '..')
        content = content.replace(/\.\.\/\.\.\/util\-g\/src/g, '../util')
        const buf = Buffer.from(content)
        chunk.contents = buf
        this.push(chunk)
        next()
      })
    )
    .pipe(dest(`packages/gantd/lib/${dirName.slice(0, -2).replace(/\-/g,'')}/`))
}

const jstasks = pkgs.map(pkg => cb => {
  jstask(pkg)
  tstask(pkg)
  cb();
})

const csstasks = pkgs.map(pkg => cb => {
  src(`packages/${pkg}/src/*.less`)
    .pipe(dest(`packages/${pkg}/lib/`))

  src(`packages/${pkg}/src/*.less`)
    .pipe(less({
      plugins: [
        new LessNpm({ prefix: '~' })
      ],
      javascriptEnabled: true,
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(`packages/${pkg}/lib/`))

  src(`packages/${pkg}/src/*.less`)
    .pipe(
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = content.replace(/\.\.\/\.\.\/gantd\/src/g, '..')
        const buf = Buffer.from(content)
        chunk.contents = buf
        this.push(chunk)
        next()
      })
    )
    .pipe(dest(`packages/gantd/lib/${pkg.slice(0, -2).replace(/\-/g,'')}/`))

  src(`packages/${pkg}/src/*.less`)
    .pipe(less({
      plugins: [
        new LessNpm({ prefix: '~' })
      ],
      javascriptEnabled: true,
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(`packages/gantd/lib/${pkg.slice(0, -2).replace(/\-/g,'')}/`))

  cb();
})

// 编译gantd
const compileGantd = (cb) => {
  src([
    'packages/gantd/src/**/*.js',
    'packages/gantd/src/**/*.jsx',
  ])
  .pipe(babel(babelConfig))
  .pipe(
    through2.obj(function (chunk, enc, next) {
      let content = chunk.contents.toString()
      content = content.replace(/\.less/g, '.css')
      content = content.replace(/\.jsx/g, '.js')
      content = content.replace(/\.\.\/\.\.\/(\w+)\-((\w+)\-)?((\w+)\-)?g\/src/g, './$1$3$5')
      const buf = Buffer.from(content)
      chunk.contents = buf
      this.push(chunk)
      next()
    })
  )
  .pipe(dest(`packages/gantd/lib/`));

  src(`packages/gantd/src/**/*.less`)
  .pipe(dest(`packages/gantd/lib/`))

  src(`packages/gantd/src/**/*.less`)
  .pipe(less({
    plugins: [
      new LessNpm({ prefix: '~' })
    ],
    javascriptEnabled: true,
  }))
  .pipe(postcss([autoprefixer()]))
  .pipe(dest(`packages/gantd/lib/`));

  cb();
}

const compile = parallel(compileGantd, ...jstasks, ...csstasks)

exports.libHeader = function() {
  tstask('header-g');
  src(`packages/header-g/src/*.less`)
    .pipe(dest(`packages/header-g/lib/`))

  src(`packages/header-g/src/*.less`)
    .pipe(less({
      plugins: [
        new LessNpm({ prefix: '~' })
      ],
      javascriptEnabled: true,
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(`packages/header-g/lib/`))
}

exports.default = series(clean, compile)