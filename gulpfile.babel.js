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
  return src([`packages/${dirName}/src/**/*.jsx`, `packages/${dirName}/src/**/*.js`])
    .pipe(babel(babelConfig))
    .pipe(
      // 处理路径等问题
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = content.replace(/@util/g, 'util-g')
        content = content.replace(/@header/g, 'header-g')
        content = content.replace(/@data\-cell/g, 'data-cell-g')
        content = content.replace(/@color\-picker/g, 'color-picker-g')
        content = content.replace(/\.less/g, '.css')
        content = content.replace(/\.jsx/g, '.js')
        const buf = Buffer.from(content)
        chunk.contents = buf
        this.push(chunk)
        next()
      })
    )
    .pipe(dest(`packages/${dirName}/lib/`))
}

const jsontask = function (dirName) {
  src(`packages/${dirName}/src/**/*.json`)
    .pipe(dest(`packages/${dirName}/lib/`))
}

const tstask = function (dirName) {
  src([`packages/${dirName}/src/**/*.tsx`, `packages/${dirName}/src/**/*.ts`])
    .pipe(
      ts({
        "target": 'es6',
        "sourceMap": true,
        "declaration": true, // 生成 *.d.ts 文件
        "allowJs": true,
        "jsx": "react",
        "forceConsistentCasingInFileNames": false,
        "noImplicitReturns": false,
        "noImplicitThis": false,
        "noImplicitAny": false,
        "noUnusedLocals": false,
        "noUnusedParameters": false,
        "noEmitOnError": false,
        "strictNullChecks": false,
        "importHelpers": true,
        "suppressImplicitAnyIndexErrors": true,
        "experimentalDecorators": true,
        "downlevelIteration": true,
        "allowSyntheticDefaultImports": true
      })
    )
    .pipe(babel(babelConfig))
    .pipe(
      // 处理路径等问题
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = content.replace(/@util/g, 'util-g')
        content = content.replace(/@header/g, 'header-g')
        content = content.replace(/@data\-cell/g, 'data-cell-g')
        content = content.replace(/@color\-picker/g, 'color-picker-g')
        content = content.replace(/\.less/g, '.css')
        content = content.replace(/\.jsx/g, '.js')
        const buf = Buffer.from(content)
        chunk.contents = buf
        this.push(chunk)
        next()
      })
    )
    .pipe(dest(`packages/${dirName}/lib/`))
}

const jsontasks = pkgs.map(pkg => cb => {
  jsontask(pkg)
  cb();
})

const jstasks = pkgs.map(pkg => cb => {
  jstask(pkg)
  tstask(pkg)
  cb();
})

const csstasks = pkgs.map(pkg => cb => {
  src(`packages/${pkg}/src/**/*.less`)
    .pipe(dest(`packages/${pkg}/lib/`))

  src(`packages/${pkg}/src/**/*.less`)
    .pipe(less({
      plugins: [
        new LessNpm({ prefix: '~' })
      ],
      javascriptEnabled: true,
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(`packages/${pkg}/lib/`))

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

// const compile = parallel(compileGantd, ...jstasks, ...csstasks)
const compile = parallel(...jstasks, ...jsontasks, ...csstasks)

exports.compileGantd = series(clean, compileGantd)
exports.default = series(clean, compile)