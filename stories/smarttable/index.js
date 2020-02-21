import React, { useState } from 'react'
import SmartTable from '@pkgs/smart-table-g/src'
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js'

const dataSource = [
  {
    name: '张三',
    age: 22,
    gender: 'MALE',
    height: 170
  },
  {
    name: '李四',
    age: 20,
    gender: 'FEMALE',
    height: 155
  },
  {
    name: '王五',
    age: 25,
    gender: 'MALE',
    height: 180
  },
]

function BasicUse() {
  const tableSchema = {
    supportColumnFields: [
      {
          fieldName: 'name',
          title: '姓名'
      },
      {
          fieldName: 'gender',
          title: '性别',
          render: V => V === 'MALE' ? '男' : '女'
      },
      {
          fieldName: 'age',
          title: '年龄'
      },
      {
          fieldName: 'height',
          title: '身高'
      }
    ],
    systemViews: [
      {
        viewId: 'systemView1',
        name: "系统视图1",
        version: '2020-02-10 09:45:37',
        panelConfig: {
          wrap: false,
          isZebra: false,
          columnFields: [
            {
              fieldName: 'name',
            },
            {
              fieldName: 'gender',
            },
            {
              fieldName: 'age',
            },
            {
              fieldName: 'height',
            }
          ]
        }
      }
    ]
  }
  return (
      <div style={{ margin: 10 }}>
        <SmartTable
          tableKey="BasicUse"
          schema={tableSchema}
          dataSource={dataSource}
        />
      </div>
  )
}

const commonCode = 
`import React, { useState } from 'react'
import SmartTable from 'smart-table-g'


ReactDOM.render(
  <BasicUse/>,
  mountNode,
)`;

const config = {
    codes: code,
    useage: `
    对于一组业务对象，不同用户在不同的时间期望看到不同的视图展现，我们需要一种机制把权利交给用户</br></br>
    <b>🧮 支持动态配置列属性</b></br>
    对于用户不同的显示要求，用户可以自由配置决定列的显示与否、列的排序、固定、对齐方式等</br></br>
    <b>🎭 支持动态配置表格样式属性</b></br>
    用户可以自由配置文字是否限制折行、是否显示斑马线、是否显示列边框、分页条位置、高度策略</br></br>
    <b>🤹🏻‍♂️ 多视图动态切换</b></br>
    你可以选择把视图信息保存在本地或者远程，用户可以迅速切换到自己期望的视图</br>
`,
    // inline: true,
    children: [
        {
            title: '基本用法',
            describe: '最简单的用法。',
            cmp: BasicUse
        }
    ]
};

export default () => <CodeDecorator config={config} />