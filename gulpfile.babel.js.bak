const gulp = require('gulp')
const { src, dest, series, parallel, task } = gulp;
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
const tsProject = ts.createProject('tsconfig.json', {
  "target": 'ES6',
  "module": "ES6",
  "skipLibCheck": true, // 忽略所有的声明文件（ *.d.ts）的类型检查。
});
const tsConfig = tsProject();

let { all: packageNames } = lernaConfig;

/**
 * 解析包引用路径
 * @param {*} content 待转换内容
 * @param {*} [rules=[]] 待解析包名
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

function scriptTask(dirName, level) {
  const pathReg = level === 3 ? '/*/*' : level === 2 ? '/*' : '/**/*';
  const targetDirName = level ? 'link' : 'lib';
  return src([`${dirName}/src${pathReg}.tsx`, `${dirName}/src${pathReg}.ts`]) // ts文件转换
    .pipe(tsConfig)
    .pipe(dest(`${dirName}/${targetDirName}/`))
    .pipe(src([`${dirName}/src${pathReg}.jsx`, `${dirName}/src${pathReg}.js`])) // es6文件转换babel
    .pipe(babel(babelConfig))
    .pipe(
      through2.obj(function (chunk, enc, next) {
        let content = chunk.contents.toString()
        content = resolvePath(content, level)
        content = content.replace(/\.less/g, '.css')
        content = content.replace(/\.jsx/g, '.js')
        const buf = Buffer.from(content)
        chunk.contents = buf
        this.push(chunk)
        next()
      })
    )
    .pipe(src(`${dirName}/src${pathReg}.json`)) // json格式直接复制
    .pipe(dest(`${dirName}/${targetDirName}/`))
}

function styleTask(dirName, targetDirName = 'lib') {
  return src(`${dirName}/src/**/*.less`)
    .pipe(dest(`${dirName}/${targetDirName}/`))
    .pipe(less({
      plugins: [
        new LessNpm({ prefix: '~' })
      ],
      javascriptEnabled: true,
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(`${dirName}/${targetDirName}/`))
}

async function libTask(dirName) {
  rimraf.sync(path.resolve(__dirname, `${dirName}/lib/`));

  await scriptTask(dirName);
  return styleTask(dirName);
}

const lib = series(...packageNames.map(dirName => {
  const tsk = function () {
    return libTask(dirName);
  }
  tsk.displayName = `lib:${dirName}`

  return tsk;
}));

async function linkTask(dirName) {
  rimraf.sync(path.resolve(__dirname, `${dirName}/link/`));

  await scriptTask(dirName, 2);
  await scriptTask(dirName, 3);
  return styleTask(dirName, 'link');
}

const link = series(...packageNames.map(dirName => {
  const tsk = function () {
    return linkTask(dirName);
  }
  tsk.displayName = `link:${dirName}`

  return tsk;
}));

packageNames.forEach(packageName => {
  const dirName = packageName.slice(9);
  task(`lib:${dirName}`, () => libTask(packageName))
  task(`link:${dirName}`, () => linkTask(packageName))
})

exports.link = link;

exports.default = lib;