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

let pkgs = fs.readdirSync(path.join(__dirname, 'packages'),{withFileTypes:true})
  .filter(item=>item.isDirectory())
  .map(item=>item.name);

// pkgs = ['smart-table-g']

function resolvePath(content, rules = [], level) {
  rules.forEach((origin) => {
    if (level) {
      content = content.replace(new RegExp('@' + origin, 'g'), '../'.repeat(level) + origin + '-g/link');
    } else {
      content = content.replace(new RegExp('@' + origin+ '/', 'g'), origin + '-g/lib/');
      content = content.replace(new RegExp('@' + origin, 'g'), origin + '-g');
    }
  })
  return content;
}

function clean(cb) {
  rimraf.sync(path.resolve(__dirname, 'packages/gantd/dist/'))
  rimraf.sync(path.resolve(__dirname, 'packages/*/lib/'))
  cb()
}

const linktask = function (dirName) {
  src([`packages/${dirName}/src/*.jsx`, `packages/${dirName}/src/*.js`])
    .pipe(babel(babelConfig))
    .pipe(
      // 处理路径等问题
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = resolvePath(content, ['util', 'header', 'data-cell', 'color-picker', 'modal', 'schema-form', 'auto-reload', 'anchor', 'submenu', 'table', 'smart-table'], 2)
        const buf = Buffer.from(content)
        chunk.contents = buf
        this.push(chunk)
        next()
      })
    )
    .pipe(dest(`packages/${dirName}/link/`))

  src([`packages/${dirName}/src/*/*.jsx`, `packages/${dirName}/src/*/*.js`])
    .pipe(babel(babelConfig))
    .pipe(
      // 处理路径等问题
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = resolvePath(content, ['util', 'header', 'data-cell', 'color-picker', 'modal', 'schema-form', 'auto-reload', 'anchor', 'submenu', 'table', 'smart-table'], 3)
        const buf = Buffer.from(content)
        chunk.contents = buf
        this.push(chunk)
        next()
      })
    )
    .pipe(dest(`packages/${dirName}/link/`))

  src([`packages/${dirName}/src/*.tsx`, `packages/${dirName}/src/*.ts`])
    .pipe(
      ts({
        "target": 'es6',
        "sourceMap": true,
        "module": "esnext",
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
    .pipe(dest(`packages/${dirName}/link/`))
    .pipe(babel(babelConfig))
    .pipe(
      // 处理路径等问题
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = resolvePath(content, ['util', 'header', 'data-cell', 'color-picker', 'modal', 'schema-form', 'auto-reload', 'anchor', 'submenu', 'table', 'smart-table'], 2)
        content = content.replace(/\.less/g, '.css')
        content = content.replace(/\.jsx/g, '.js')
        const buf = Buffer.from(content)
        chunk.contents = buf
        this.push(chunk)
        next()
      })
    )
    .pipe(dest(`packages/${dirName}/link/`))

  src([`packages/${dirName}/src/*/*.tsx`, `packages/${dirName}/src/*/*.ts`])
    .pipe(
      ts({
        "target": 'es6',
        "sourceMap": true,
        "module": "esnext",
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
    .pipe(dest(`packages/${dirName}/link/`))
    .pipe(babel(babelConfig))
    .pipe(
      // 处理路径等问题
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = resolvePath(content, ['util', 'header', 'data-cell', 'color-picker', 'modal', 'schema-form', 'auto-reload', 'anchor', 'submenu', 'table', 'smart-table'], 3)
        content = content.replace(/\.less/g, '.css')
        content = content.replace(/\.jsx/g, '.js')
        const buf = Buffer.from(content)
        chunk.contents = buf
        this.push(chunk)
        next()
      })
    )
    .pipe(dest(`packages/${dirName}/link/`))
}

const jstask = function (dirName) {
  return src([`packages/${dirName}/src/**/*.jsx`, `packages/${dirName}/src/**/*.js`])
    .pipe(babel(babelConfig))
    .pipe(
      // 处理路径等问题
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = resolvePath(content, ['util', 'header', 'data-cell', 'color-picker', 'modal', 'schema-form', 'auto-reload', 'anchor', 'submenu', 'table', 'smart-table'])
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
    .pipe(dest(`packages/${dirName}/link/`))
}

const tstask = function (dirName) {
  src([`packages/${dirName}/src/**/*.tsx`, `packages/${dirName}/src/**/*.ts`])
    .pipe(
      ts({
        "target": 'es6',
        "sourceMap": true,
        "module": "esnext",
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
    .pipe(dest(`packages/${dirName}/lib/`))
    .pipe(babel(babelConfig))
    .pipe(
      // 处理路径等问题
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = resolvePath(content, ['util', 'header', 'data-cell', 'color-picker', 'modal', 'schema-form', 'auto-reload', 'anchor', 'submenu', 'table', 'smart-table'])
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

const linktasks = pkgs.map(pkg => cb => {
  linktask(pkg)
  cb();
})

const csstasks = pkgs.map(pkg => cb => {
  src(`packages/${pkg}/src/**/*.less`)
    .pipe(dest(`packages/${pkg}/lib/`))
    .pipe(dest(`packages/${pkg}/link/`))

  src(`packages/${pkg}/src/**/*.less`)
    .pipe(less({
      plugins: [
        new LessNpm({ prefix: '~' })
      ],
      javascriptEnabled: true,
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(`packages/${pkg}/lib/`))
    .pipe(dest(`packages/${pkg}/link/`))

  cb();
})

const compile = parallel(...jstasks, ...jsontasks, ...csstasks)

const cleanLink = (cb) => {
  rimraf.sync(path.resolve(__dirname, 'packages/*/link/'))
  cb()
}

exports.compileLink = series(cleanLink, parallel(...linktasks, ...jsontasks, ...csstasks))

exports.default = series(clean, compile)