import React, { useState } from 'react'
import SmartTable from '@packages/smart-table-g/src'
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
    useage: '这是一个智能表格。支持动态配置列属性，表格样式属性，并可以动态切换配置好的视图。',
    inline: true,
    children: [
        {
            title: '基本用法',
            describe: '最简单的用法。',
            cmp: BasicUse
        }
    ]
};

export default () => <CodeDecorator config={config} />