
import React from 'react';
import Img from './intro.png'
import './index.css'


export default () => <div className="idea">

  <img src={Img} className="img"/>
  <h2 className="title">简介</h2>
  <div className="content">
    聚合型超级ui组件库,面向B端产品、管理型软件，在Antd的基础上做了不同程度的针对性的强化，也可以视作为Antd的补充，可以和Antd同时使用。
  </div>
  <h2 className="title">特性</h2>
  <div className="content">
    <ul>
      <li> 💻 面向2B后台产品，偏数据密集型紧凑风格</li>
      <li> 🚗 基于数据驱动模式快速开发组件、如数据驱动表单</li>
      <li> 👨‍👩‍👧‍👧 赋能式组件，比如智能表格（smartTable），把权利交给终端用户</li>
      <li> 🛡 使用 TypeScript 开发，提供完整的类型定义文件</li>
    </ul>
  </div>
</div>