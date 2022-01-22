const fs = require('fs');
const fse = require('fs-extra');

//需要拷贝的文件路径
const copyPaths = [
  {
    from: `${__dirname}/../CNAME`,
    to: `${__dirname}/../docs/CNAME`,
  }
];

//遍历拷贝
(async () => {
  console.log(`开始执行copy`);
  try {
    for (let copyPath of copyPaths) {
      const { from, to } = copyPath;
      const existfrom = fs.existsSync(from);
      if (!existfrom) {
        continue;
      }
      fse.copySync(from, to);
      console.log(`copy完毕 ${from}->${to}`);
    }
  } catch (err) {
    console.log(`copy出错`);
  }
})();
