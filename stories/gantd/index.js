
import React from 'react';
import Img from '../../assests/images/logo.png'
import './index.css'
import { Tag } from 'antd'
import Prism from 'prismjs'
Prism.highlightAll()






export default () => {
  Prism.highlightAll()
  return <div className="idea">

    <img src={Img} className="img" />

    <div className="content" style={{ fontSize: 14 }}>
      <div>GantD是面向B端管理型软件、专注于数据密集型业务场景、基于Antd聚合型React组件库</div>
      <div>在Antd的基础上做了不同程度的针对性的强化，亦可以视作为Antd的补充，可以和Antd同时使用</div>
    </div>
    <h2 className="title">特性</h2>
    <div className="content">
      <ul>
        <li> 💻 面向企业后台产品，偏数据密集型紧凑风格</li>
        <li> 🚗 基于数据驱动模式快速开发组件、如数据驱动表单</li>
        <li> 👨‍👩‍👧‍👧 赋能式组件，比如智能表格（smartTable），把权利交给终端用户</li>
        <li> 🛡 使用 TypeScript 开发，提供完整的类型定义文件</li>
      </ul>
    </div>
    <h2 className="title">安装</h2>

    <div className="content">
      我们推荐使用 npm 或 yarn 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
      <pre className="language-bash">
        <code >
          $ npm install gantd --save
      </code>
      </pre>
      <pre className="language-bash">
        <code >
          $ yarn add gantd --save
      </code>
      </pre>
    </div>

    <h2 className="title">示例</h2>
    <div className="content">
      <pre className="language-javascript">
        <code>
          <div dangerouslySetInnerHTML={{
            __html: Prism.highlight(`import {Input} from 'gantd';
ReactDOM.render(<Input />, mountNode);
`, Prism.languages.javascript, 'javascript')
          }} ></div>
        </code >
      </pre >
    </div >





  </div >
}