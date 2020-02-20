const codeGenerator = (code) =>
`import React, { useState } from 'react'
import { Button } from 'antd'
import SmartTable from 'smart-table-g'

${code}

ReactDOM.render(
  <BasicUse/>,
  mountNode,
)`;

const code1 =
`
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
}`

export default [codeGenerator(code1)];