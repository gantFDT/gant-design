import React from 'react'
// import {Card,Anchor } from '@'
// import {Anchor} from '@';
import Anchor from '@pkgs/anchor-g/src';
import CodeDecorator from '../_util/CodeDecorator'
import { Button } from 'antd';

const code = `
import { Anchor } from 'gantd';
import { Button } from 'antd';
function BasicUse() {
  const list = [
    {
      id: 'horbasic1',
      title: '基本信息1',
      complete: true
    },
    {
      id: 'horbasic2',
      title: '高级信息',
    },
    {
      id: 'horbasic3',
      title: '额外信息',
      complete: false
    }
  ]
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    height: 400,
    fontSize:24,
    border:'1px solid rgba(128,128,128,0.1)'
  }
  return (
    <>
      <Anchor
        list={list}
        minHeight={800}
        content={
          <div>
            <div id='horbasic1' style={style}>基本信息</div>
            <div id='horbasic2' style={style}>高级信息</div>
            <div id='horbasic3' style={style}>额外信息</div>
          </div>
        }
      />
    </>
  )
}

ReactDOM.render(<Basic />, mountNode)`

function BasicUse() {
  const list = [
    {
      id: 'horbasic1',
      title: '基本信息1',
      complete: true
    },
    {
      id: 'horbasic2',
      title: '高级信息',
    },
    {
      id: 'horbasic3',
      title: '额外信息',
      complete: false
    }
  ]
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    fontSize: 24,
    width: '100%',
    border: '1px solid rgba(128,128,128,0.1)'
  }
  return (
    <>
      <Anchor
        list={list}
        minHeight={800}
        content={
          <div>
            <div id='horbasic1' style={style}>基本信息</div>
            <div id='horbasic2' style={style}>高级信息</div>
            <div id='horbasic3' style={style}>额外信息</div>
          </div>
        }
      />
    </>
  )
}

const config = {
  codes: [code],
  useage: `
  <b>📚 可快速切换锚点展示为页签效果</b></br>
  在横向空间很局限时，用户可以把锚点快速切换为顶部页签效果</br>
  <b>⛏ 磁吸效果</b></br>
  当菜单滚动超出屏幕时，可以开启磁吸效果</br>
  `,
  showAnchor: false,
  children: [
    {
      title: '基本用法',
      describe: '注意：可切换锚点位置，右侧或上侧 ',
      cmp: BasicUse
    },

  ]
};
export default () => <CodeDecorator config={config} />