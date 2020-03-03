const sleep = `
/**
 * sleep函数 暂停几秒
 * @params time 时长
*/
function sleep(time){
    yield new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve()
        }, time)
    })
}`


const delDir = `
/**
 * 同步删除文件夹
 * @params path 文件夹路径
 * */
function  delDir(path) {
    let files = [];
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
        let curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
          utils.delDir(curPath); //递归删除文件夹
        } else {
          fs.unlinkSync(curPath); //删除文件
        }
      });
      fs.rmdirSync(path);
    }
  },
`

const fileReplace = `
/**
 * 文件替换内容
 * @params path string 文件路径
 * @params regexp  替换规则
 * @params content 替换内容
*/
function fileReplace(path, regexp, content) {
    fs.readFile(path, 'utf8', (err, files) => {
      var result = files.replace(regexp, content);
      fs.writeFile(path, result, 'utf8', (err) => {
        if (err) return console.log(err);
      });
    })
  }
`
const dirReplace = `
/**
 * 文件夹替换内容
 * @params path string 文件夹路径
 * @params regexp  替换规则
 * @params content 替换内容
*/
function dirReplace(dirpath, regexp, content) {
    let fileList = fs.readdirSync(dirpath);
    fileList.forEach(x => {
      let p = path.resolve(dirpath, x);
      let pinfo = fs.statSync(p);
      if (pinfo.isFile()) {
        utils.fileReplace(p, regexp, content);
      } else if (pinfo.isDirectory()) {
        utils.dirReplace(p, regexp, content);
      }
    });
  }
`
const mkdirsSync = `
/**
 * 递归创建目录 同步方法
 * @params dirname目录名
*/
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (utils.mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  }
`
const copySync= `
//同步复制
function copySync(src, dist) {
    var paths = fs.readdirSync(src)
    paths.forEach((p) => {
      var _src = src + '/' + p;
      var _dist = dist + '/' + p;
      var stat = fs.statSync(_src)
      if (stat.isFile()) {// 判断是文件还是目录
        fs.writeFileSync(_dist, fs.readFileSync(_src));
      } else if (stat.isDirectory()) {
        utils.copyDir(_src, _dist)// 当是目录是，递归复制
      }
    })
  }
`
const copyDir = `

//同步复制文件夹
function  copyDir(src, dist) {
    var b = fs.existsSync(dist)
    if (!b) {
      utils.mkdirsSync(dist);//创建目录
    }
    utils.copySync(src, dist);
}
  
`

export default [
    sleep,
    delDir,
    fileReplace,
    dirReplace,
    mkdirsSync,
    copySync,
    copyDir
]