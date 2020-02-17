
import React from 'react';
import Img from './intro.png'
import './index.css'


export default () => <div className="idea">

  <img src={Img} className="img"/>
  <h1 className="title">简介</h1>
  <div className="content">
    聚合型超级ui组件库,偏向于toB产品,管理型软件，在antd的基础上做了一些针对性的强化
  </div>
  <h1 className="title">特性</h1>
  <div className="content">
    ……
  </div>
</div>