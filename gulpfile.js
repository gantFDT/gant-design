const { src, dest, series, task, watch } = require('gulp')
const fs = require('fs')
const babel = require('gulp-babel')
const rimraf = require('rimraf')
const path = require('path')
const less = require('gulp-less')
const gulpif = require('gulp-if')
const minimist = require('minimist')
const uglify = require('gulp-uglify')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
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

const options = minimist(process.argv.slice(2), {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'production' }
});

const isWin = process.platform === 'win32';
const pathSplit = isWin ? '\\' :'/';

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
  const regex = /(import|export)\s{0,}\{(.+)\}\s{0,}from\s{0,}[\'\"]@data\-cell[\'\"]/;
  const execs = regex.exec(content);
  if(!execs) return content;

  const method = execs[1];
  const dirs = execs[2].split(',').map(s => s.trim());

  let str2replace = '';
  dirs.forEach((dirName, idx) => {
    if(dirName){
      if(method === 'import'){
        str2replace+=`${idx ? '\n' : ''}${method} ${dirName} from '${repeat ? '../'.repeat(repeat) : './'}${transToCamelCase(dirName)}'`;
      }else{
        str2replace+=`${idx ? '\n' : ''}${method} { default as ${dirName} } from '${repeat ? '../'.repeat(repeat) : './'}${transToCamelCase(dirName)}'`;
      }
    }
      
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
        .pipe(filter(file => !file.path.endsWith('.d.ts')))
        .pipe(src([`packages/${dirName}/src/**/*.jsx`, `packages/${dirName}/src/**/*.js`]))
        .pipe(
          // 处理DataCell路径问题
          through2.obj(function (file, enc, next) {
            let content = file.contents.toString()
            if( dirName === 'gantd' ){ 
              const filePath = file.path;
              const Idx = filePath.lastIndexOf(dirName);
              const filelevel = filePath.slice(Idx).split(pathSplit).length;
              content = resolveDataCellPath(content, filelevel - 3)
            }
            const buf = Buffer.from(content)
            file.contents = buf
            this.push(file)
            next()
          })
        )
        .pipe(babel(babelConfig))
        .pipe(
          // 处理@开头的路径解析问题
          through2.obj(function (file, enc, next) {
            let content = file.contents.toString()
            const filePath = file.path;
  
            content = content.replace(/\.less/g, '.css')
            content = content.replace(/\.jsx/g, '.js')
            
            if(~content.indexOf(`@`)){ // 初步筛选内容
              if(dirName === 'gantd'){
                const Idx = filePath.lastIndexOf(dirName);
                const filelevel = filePath.slice(Idx).split(pathSplit).length;
                const pathPrefix = filelevel > 3 ? '../'.repeat(filelevel - 3) : './';
  
                packageNames.forEach((packageName) => {
                  const _dirName = packageName.slice(9, -2);
                  content = content.replace(new RegExp('@' + _dirName, 'g'), pathPrefix + _dirName);
                })
              }else{ // 子包依赖线上包
                packageNames.forEach((packageName) => {
                  const _dirName = packageName.slice(9, -2);
                  content = content.replace(new RegExp('@' + _dirName + '/', 'g'), _dirName + '-g/lib/');
                  content = content.replace(new RegExp('@' + _dirName, 'g'), _dirName + '-g');
                })
              }
            }
            const buf = Buffer.from(content)
            file.contents = buf
            if(filePath.endsWith(`style${pathSplit}index.js`)){
              fs.writeFileSync(filePath.replace('index', 'css'), buf)
            }
            this.push(file)
            next()
          })
        )
        .pipe(gulpif(options.env === 'production', uglify({
            warnings: false,
            compress: {
                // drop_console: true,  // 过滤 console
                drop_debugger: true  // 过滤 debugger
            }
        })))
        .pipe(dest(`packages/${dirName}/lib/`))
    },
    function compileDTS() {
      return src(`packages/${dirName}/lib/**/*.d.ts`)
        .pipe(
          // 处理DataCell路径问题
          through2.obj(function (file, enc, next) {
            let content = file.contents.toString()
            const filePath = file.path;
            if(dirName === 'gantd'){
              const Idx = filePath.lastIndexOf(dirName);
              const filelevel = filePath.slice(Idx).split(pathSplit).length;
              const pathPrefix = filelevel > 3 ? '../'.repeat(filelevel - 3) : './';
  
              content = resolveDataCellPath(content, filelevel - 3)

              packageNames.forEach((packageName) => {
                const _dirName = packageName.slice(9, -2);
                content = content.replace(new RegExp('@' + _dirName, 'g'), pathPrefix + _dirName);
              })
            }else{
              packageNames.forEach((packageName) => {
                const _dirName = packageName.slice(9, -2);
                content = content.replace(new RegExp('@' + _dirName + '/', 'g'), _dirName + '/lib/');
                content = content.replace(new RegExp('@' + _dirName, 'g'), _dirName + '-g');
              })
            }

            const buf = Buffer.from(content)
            
            if(filePath.endsWith(`style${pathSplit}index.d.ts`)){
              fs.writeFileSync(filePath.replace('index', 'css'), buf)
            }
            file.contents = buf
            this.push(file)
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
      return src([`packages/${dirName}/src/**/*.tsx`, `packages/${dirName}/src/**/*.ts`, `!packages/data-cell-g/src/index.tsx`])
        .pipe(tsProject())
        .pipe(dest(`packages/gantd/${targetDir}/${__dirName === 'data-cell' ? '' : (__dirName + '/')}`))
        .pipe(filter(file => !file.path.endsWith('.d.ts')))
        .pipe(src([`packages/${dirName}/src/**/*.jsx`, `packages/${dirName}/src/**/*.js`]))
          .pipe(
          // 处理路径等问题
          through2.obj(function (file, enc, next) {
            let content = file.contents.toString()
            const filePath = file.path;
            const Idx = filePath.indexOf(__dirName);
            const filelevel = filePath.slice(Idx).split(pathSplit).length;
            content = resolveDataCellPath(content, dirName !== 'data-cell-g' ? (filelevel - 1) : 1)
            const buf = Buffer.from(content)
            file.contents = buf
            this.push(file)
            next()
          })
        )
        .pipe(babel(babelConfig))
        .pipe(
          // 处理路径等问题
          through2.obj(function (file, enc, next) {
            let content = file.contents.toString()
            const filePath = file.path;
            const isStyleFile = filePath.endsWith(`style${pathSplit}index.js`);

            content = content.replace(/\.less/g, '.css')
            content = content.replace(/\.jsx/g, '.js')

            if(~content.indexOf('@')){
              const Idx = filePath.indexOf(__dirName);
              const filelevel = filePath.slice(Idx).split(pathSplit).length;
              const pathPrefix = __dirName !== 'data-cell' ? '../'.repeat(filelevel-1) : '../';
              if(isStyleFile){ // 处理 */style/index.js 里面的 '@data-cell/*/style'
                content = content.replace(new RegExp('@data-cell/', 'g'), pathPrefix);
              }

              packageNames.forEach((packageName) => {
                const _dirName = packageName.slice(9, -2);
                if(_dirName === 'color-picker'){
                  if(isStyleFile){
                    content = content.replace(new RegExp('@' + _dirName, 'g'), pathPrefix + '../_color-picker');
                  }else{
                    content = content.replace(new RegExp('@' + _dirName, 'g'), pathPrefix + '_color-picker');
                  }
                }else{
                  content = content.replace(new RegExp('@' + _dirName, 'g'), pathPrefix + _dirName);
                }
              })
            }
            const buf = Buffer.from(content)
            file.contents = buf
            if(isStyleFile){
              fs.writeFileSync(filePath.replace('index', 'css'), buf)
            }
            this.push(file)
            next()
          })
        )
        .pipe(gulpif(options.env === 'production', uglify({
          warnings: false,
          compress: {
              drop_console: true,  // 过滤 console
              drop_debugger: true  // 过滤 debugger
          }
        })))
        .pipe(dest(`packages/gantd/${targetDir}/${__dirName === 'data-cell' ? '' : (__dirName + '/')}`))
    },
    function compileDTS() {
      return src(`packages/gantd/${targetDir}/${__dirName === 'data-cell' ? '' : (__dirName + '/')}**/*.d.ts`)
        .pipe(
          // 处理DataCell路径问题
          through2.obj(function (file, enc, next) {
            let content = file.contents.toString()
            const filePath = file.path;
            const isStyleFile = filePath.endsWith(`style${pathSplit}index.d.ts`);
            const Idx = filePath.lastIndexOf(__dirName);
            const filelevel = filePath.slice(Idx).split(pathSplit).length;
            const pathPrefix = '../'.repeat(filelevel - 1);
            if(isStyleFile){ // 处理 */style/index.js 里面的 '@data-cell/*/style'
              content = content.replace(new RegExp('@data-cell/', 'g'), pathPrefix);
            }

            content = resolveDataCellPath(content, filelevel - 1)

            packageNames.forEach((packageName) => {
              const _dirName = packageName.slice(9, -2);
              content = content.replace(new RegExp('@' + _dirName, 'g'), pathPrefix + _dirName);
            })

            const buf = Buffer.from(content)
            if(isStyleFile){
              fs.writeFileSync(filePath.replace('index', 'css'), buf)
            }
            file.contents = buf
            this.push(file)
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

task('code', function code(){

  const CODE_START = '/*! Start !*/';
  const CODE_END = '/*! End !*/';
  const CODE_SPLIT = '/*! Split !*/';
  const REGEX = /function\s+([\w\-]+)\s*\(\S*\)\s*\{[\s\S]+\}|const\s+([\w\-]+)\s*=(\s\(\S*\)\s*=>\s*\{[\s\S]+\})?/;

  return src([`stories/*/index.js`, `stories/*/index.ts`, `stories/*/index.jsx`, `stories/*/index.tsx`])
    .pipe(
      through2.obj(function (file, enc, next) {
        let content = file.contents.toString();
        const startIdx = content.indexOf(CODE_START);
        if(~startIdx){
          let fileContent = 'export default [\n';
          const endIdx = content.indexOf(CODE_END);
          const codeStr = content.slice(startIdx + CODE_START.length, endIdx);
          const [ CodeHead, ...CodeBodys ] = codeStr.split(CODE_SPLIT);
          const Header = CodeHead.replace(/@/g, '').replace(/([`\$])/g,'\\$1');
          CodeBodys.forEach(CodeBody => {
            const matches = REGEX.exec(CodeBody);
            if(matches){
              const [_, _name, __name] = matches;
              CodeBody = CodeBody.replace(/([`\$])/g,'\\$1')
              fileContent += `\`${Header}\n${CodeBody}\nReactDOM.render(<${_name || __name} />, mountNode)\`,`;
            }
          })
          fileContent += ']';
          const buf = Buffer.from(fileContent)
          file.contents = buf
          this.push(file)
          next()
        }else{
          next(false)
        }
      })
    )
    .pipe(rename({
      basename: 'code',
      extname: ".js"
    }))
    .pipe(dest(`stories/`))
})

task('watch:code', function () {
  watch([`stories/*/index.js`, `stories/*/index.ts`, `stories/*/index.jsx`, `stories/*/index.tsx`], series('code'));
})

task('default', series('clean', 'lib'))