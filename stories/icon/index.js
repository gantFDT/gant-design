
import { Icon } from '@packages/gantd/src';
// import {Icon} from 'antd'
import React from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import code from './code.js';



function BasicUse() {
  Icon.updateFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1252237_yp35yr9jf6.js'
  })
  return (<>
    <div style={{ fontSize: 24 }}>
      <Icon type="icon-dashboard" />
    </div>
    <div style={{ fontSize: 24 }}>
      <Icon type="home" />
    </div>
  </>
  )
}


const config = {
  codes: code.map(item => {

    return `
      import { Icon } from 'gantd';
      ReactDOM.render(
          ${item},
          mountNode,
      );
      `
  }),
  useage: ` <b> 🙆🏻‍♂️ 默认支持渲染iconfont</b></br>
    在我们的项目中，由于Ant自带的icon不能满足需求，我们大多数情况是借助iconfont</br>
    而我们数据统一渲染，不知道后端返回的icon数据是ant的还是iconfont, 我们不可能在业务代码中去判断渲染哪种Icon组件</br>
    故封装了一层`,
  children: [
    {
      title: '支持渲染iconfont',
      describe: '可以同时支持渲染iconfont或者anticon,减少业务层的逻辑',
      cmp: BasicUse
    }
  ]
};

export default () => <CodeDecorator config={config} />