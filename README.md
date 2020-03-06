#Gantd 

GantD是面向B端管理型软件、专注于数据密集型业务场景、基于Antd聚合型React组件库
在Antd的基础上做了不同程度的针对性的强化，亦可以视作为Antd的补充，可以和Antd同时使用

##特性 

💻 面向企业后台产品，偏数据密集型紧凑风格
🚗 基于数据驱动模式快速开发组件、如数据驱动表单
👨‍👩‍👧‍👧 赋能式组件，比如智能表格（smartTable），把权利交给终端用户
🛡 使用 TypeScript 开发，提供完整的类型定义文件

##安装 

我们推荐使用 npm 或 yarn 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
```bash
npm install gantd --save
yarn add gantd --save
```
##示例 

```bash
import {Input} from 'gantd';
ReactDOM.render(<Input />, mountNode);
```