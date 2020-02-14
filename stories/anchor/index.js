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
    alignItems:'center',
    height: 400,
    fontSize:24,
    width:'100%',
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

const config = {
  codes: [code],
  useage: '用于给区域加锚点',
  children: [
    {
      title: '基本用法',
      describe: '注意：可切换锚点位置，右侧或上侧 ',
      cmp: BasicUse
    },

  ]
};
export default () => <CodeDecorator config={config} />