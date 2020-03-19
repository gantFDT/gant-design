
import React from 'react';
import Img from '../../assests/images/logo.png'
import './index.css'
import { Tag } from 'antd'
import Prism from 'prismjs'
Prism.highlightAll()

export default () => {
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
        <code>
          <div dangerouslySetInnerHTML={{
            __html: Prism.highlight(`npm install gantd --save
`, Prism.languages.bash, 'bash')
          }} ></div>
        </code >
      </pre >
      <pre className="language-bash">
        <code>
          <div dangerouslySetInnerHTML={{
            __html: Prism.highlight(`yarn add gantd --save
`, Prism.languages.bash, 'bash')
          }} ></div>
        </code >
      </pre >

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
      引入样式：
      <pre className="language-javascript">
        <code>
          <div dangerouslySetInnerHTML={{
            __html: Prism.highlight(`import 'gantd/dist/gantd.css'
`, Prism.languages.javascript, 'javascript')
          }} ></div>
        </code >
      </pre >

    </div >


    <h2 className="title">按需加载</h2>
    <div className="content">
      下面两种方式都可以只加载用到的组件。
      <h4>1、使用 babel-plugin-import（推荐）。</h4>
      <pre className="language-javascript">
        <code>
          <div dangerouslySetInnerHTML={{
            __html: Prism.highlight(`// .babelrc or babel-loader option
{
  "plugins": [
    ["import", {
      "libraryName": "gantd",
      "libraryDirectory": "lib",
      "style": "css"
    }]
  ]
}
`, Prism.languages.javascript, 'javascript')
          }} ></div>
        </code >
      </pre >
      然后只需从 gantd 引入模块即可，无需单独引入样式。等同于下面手动引入的方式。
      <pre className="language-javascript">
        <code>
          <div dangerouslySetInnerHTML={{
            __html: Prism.highlight(`// babel-plugin-import 会帮助你加载 JS 和 CSS
import { SmartTable } from 'gantd';
`, Prism.languages.javascript, 'javascript')
          }} ></div>
        </code >
      </pre >
      <h4>2、手动引入</h4>
      <pre className="language-javascript">
        <code>
          <div dangerouslySetInnerHTML={{
            __html: Prism.highlight(`import DatePicker from 'gantd/lib/smart-table'; // 加载 JS
import 'gantd/lib/smart-table/style/css'; // 加载 CSS
`, Prism.languages.javascript, 'javascript')
          }} ></div>
        </code >
      </pre >
    </div >


    <h2 className="title">链接</h2>
    <div className="content">
      <ul>
        <li>
          <a href="https://github.com/gantFDT/gant-design" target="_blank">GITHUB</a>
        </li>
        <li>
          <a href="https://ant.design/index-cn" target="_blank">Ant Design</a>
        </li>
        <li>
          <a href="#" target="_blank">Lite UI Framework</a>
        </li>
      </ul>



    </div>

  </div >
}