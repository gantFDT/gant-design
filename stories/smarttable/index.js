import React, { useState, useCallback, useMemo } from 'react'
import { Divider, Tag, Radio, Switch, Button, message } from 'antd'
import SmartTable from '@packages/smart-table-g/src'
import { Input, InputNumber, DatePicker, InputUrl, LocationSelector, InputCellPhone, InputEmail, InputLanguage, InputMoney, EditStatus, SwitchStatus } from '@packages/data-cell-g/src'
import _ from 'lodash'
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js'

function EditInlineUse() {
  const smartTableSchema = [
    {
      fieldName: 'name',
      title: '姓名'
    },
    {
      fieldName: 'age',
      title: '年龄',
      componentType: 'InputNumber'
    },
    {
      fieldName: 'cellPhone',
      title: '手机号',
      componentType: 'InputCellPhone'
    },
    {
      fieldName: 'domain',
      title: '个人主页',
      componentType: 'InputUrl'
    },
    {
      fieldName: 'email',
      title: '邮箱',
      componentType: 'InputEmail'
    },
    {
      fieldName: 'bio',
      title: '简介',
      componentType: 'InputLanguage',
      props: {
        localeList: [
          { locale: 'zh-CN', label: '中文' },
          { locale: 'en-US', label: '英文' },
        ]
      }
    },
    {
      fieldName: 'price',
      title: '挂号费',
      componentType: 'InputMoney'
    },
    {
      fieldName: 'address',
      title: '地址',
      componentType: 'LocationSelector'
    },
    {
      fieldName: 'birth',
      title: '生日',
      componentType: 'DataPicker'
    }
  ]

  const data = [
    {
      name: '王医生',
      age: 55,
      cellPhone: { phone: "18010032938" },
      domain: 'https://www.baidu.com/',
      email: 'doc_wang@qq.com',
      bio: { locale: 'zh-CN', value: '华西口腔主任医师。' },
      price: { money: 29.9 },
      address: ["CHN", "510000", "510100"],
      birth: '1965-04-24',
    },
    {
      name: '张医生',
      age: 42,
      cellPhone: { phone: "13583384957" },
      domain: 'https://www.google.com/',
      email: 'doc_zhang@163.com',
      bio: { locale: 'zh-CN', value: '北京协和泌尿科主任医师。' },
      price: { money: 19.9 },
      address: ["CHN", "110000", "110101"],
      birth: '1977-01-04',
    },
    {
      name: '李医生',
      age: 35,
      cellPhone: { phone: "13777574848" },
      domain: 'https://www.souhu.com/',
      email: 'doc_li@souhu.com',
      bio: { locale: 'zh-CN', value: '上海第一人民医院妇产科主治医师。' },
      price: { money: 9.9 },
      address: ["CHN", "310000", "310104"],
      birth: '1986-02-14',
    }
  ]

  const [stateData, setStateData] = useState(data)
  const [editing, setEditing] = useState(EditStatus.CANCEL);
  const getDifference = useCallback(
    (current, old) => {
      const result = []
      for (let i = 0, len = current.length; i < len; i++) {
        const { children = [], ...currentItem } = current[i]
        const { children: oldChildren = [], ...oldItem } = old[i]
        if (!_.isEqual(currentItem, oldItem)) {
          result.push(currentItem)
        }
        if (children.length && oldChildren.length && !_.isEqual(children, oldChildren)) {
          const diff = getDifference(children, oldChildren)
          result.push.apply(result, diff)
        }
      }
      return result
    },
    [],
  )
  const onSave = useCallback(
    (newStateData) => {
      const diff = getDifference(newStateData, stateData)
      setStateData(newStateData)
      console.log('差异数据：', diff)
    },
    [stateData],
  )
  const handleSave = useCallback(() => {
    setEditing(EditStatus.SAVE)
  }, [])
  const getSchema = useMemo(() => {
    return smartTableSchema.map(item => {
      switch (item.fieldName) {
        case 'name':
          item['editConfig'] = {
            render: (value, record, index) => {
              return <Input type='input' />
            },
          };
          break;
        case 'age':
          item['editConfig'] = {
            render: (value, record, index) => {
              return <InputNumber />
            },
          };
          break;
        case 'cellPhone':
          item['editConfig'] = {
            render: (value, record, index) => {
              return <InputCellPhone />
            },
          };
          break;
        case 'domain':
          item['editConfig'] = {
            render: (value, record, index) => {
              return <InputUrl/>
            },
          };
          break;
        case 'email':
          item['editConfig'] = {
            render: (value, record, index) => {
              return <InputEmail/>
            },
          };
          break;
        case 'bio':
          item['editConfig'] = {
            render: (value, record, index) => {
              return <InputLanguage/>
            },
          };
          break;
        case 'price':
          item['editConfig'] = {
            render: (value, record, index) => {
              return <InputMoney/>
            },
          };
          break;
        case 'address':
          item['editConfig'] = {
            render: (value, record, index) => {
              return <LocationSelector/>
            },
          };
          break;
        case 'birth':
          item['editConfig'] = {
            render: (value, record, index) => {
              return <DatePicker/>
            },
          };
          break;
        default:
          break;
      }
      return item
    })
  }, [])
  return (
    <div style={{ margin: 10 }}>
      <SmartTable
        tableKey="EditInlineUse"
        rowKey="id"
        schema={getSchema}
        dataSource={stateData}
        editable={editing}
        bodyHeight={300}
        onSave={onSave}
        headerRight={<>
          <Button
            icon={editing === EditStatus.EDIT ? "roolback" : "edit"}
            className="marginh5"
            size="small"
            onClick={() => { if (editing === EditStatus.CANCEL) { message.info('请单击单元格进行编辑') };setEditing(SwitchStatus) }}
          >
            {editing === EditStatus.EDIT ? "结束" : "进入"}编辑
          </Button>
          {editing === EditStatus.EDIT && <Button
            icon="save"
            className="marginh5"
            size="small"
            type="primary"
            onClick={handleSave}
          >
            保存
          </Button>}
        </>}
      />
    </div>
  )
}

const dataSource = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '四川成都 春熙路1号',
    tags: ['宅', '程序猿'],
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '北京 天安门大道123号',
    tags: ['高富帅'],
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '天津 南京路23号',
    tags: ['矮矬穷', '教师'],
  },
]


const tableColumns = [
  {
    title: '姓名',
    fieldName: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '年龄',
    fieldName: 'age',
  },
  {
    title: '住址',
    fieldName: 'address',
  },
  {
    title: '标签',
    fieldName: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '操作',
    fieldName: 'action',
    render: (text, record) => (
      <span>
        <a>邀请 {record.name}</a>
        <Divider type="vertical" />
        <a>删除</a>
      </span>
    ),
  },
]


function BasicUse() {
  return (
    <div style={{ margin: 10 }}>
      <SmartTable
        tableKey="BasicUse"
        schema={tableColumns}
        dataSource={dataSource}
      />
    </div>
  )
}

function ConfigColumnsUse() {
  const tableSchema = {
    supportColumnFields: tableColumns,
    systemViews: [
      {
        viewId: 'systemView1',
        name: "系统视图1",
        version: '2020-02-10 09:45:37',
        panelConfig: {
          columnFields: [
            {
              fieldName: 'tags',
              fixed: 'left',
              width: 300
            },
            {
              fieldName: 'name',
              align: 'right'
            },
            {
              fieldName: 'address',
            },
            {
              fieldName: 'action',
              align: 'center'
            },
          ]
        }
      }
    ]
  }
  return (
    <div style={{ margin: 10 }}>
      <SmartTable
        tableKey="ConfigViewUse"
        schema={tableSchema}
        dataSource={dataSource}
      />
    </div>
  )
}

function ConfigDisplayUse() {
  const tableSchema = {
    supportColumnFields: tableColumns,
    systemViews: [
      {
        viewId: 'systemView1',
        name: "系统视图1",
        version: '2020-02-10 09:45:37',
        panelConfig: {
          wrap: false,
          isZebra: false,
          bordered: false,
          clickable: false,
          footerDirection: 'row-reverse',
          heightMode: 'auto',
          columnFields: tableColumns.map(column => ({ fieldName: column.fieldName }))
        }
      }
    ]
  }
  const [rowKeys, setRowKeys] = useState([])
  return (
      <div style={{ margin: 10 }}>
        <SmartTable
          tableKey="ConfigDisplayUse"
          schema={tableSchema}
          dataSource={dataSource}
          rowSelection={
            {
              selectedRowKeys: rowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                setRowKeys(selectedRowKeys)
              }
            }
          }
        />
      </div>
  )
}

function MultiViewUse() {
  const tableSchema = {
    supportColumnFields: tableColumns,
    systemViews: [
      {
        viewId: 'systemView1',
        name: "隐藏年龄",
        version: '2020-02-10 09:45:37',
        panelConfig: {
          columnFields: [
            {
              fieldName: 'tags',
              fixed: 'left',
              width: 300
            },
            {
              fieldName: 'name',
              align: 'right'
            },
            {
              fieldName: 'address',
            },
            {
              fieldName: 'action',
              align: 'center'
            },
          ]
        }
      },
      {
        viewId: 'systemView2',
        name: "禁止操作",
        version: '2020-02-10 09:45:37',
        panelConfig: {
          columnFields: [
            {
              fieldName: 'name',
              align: 'right'
            },
            {
              fieldName: 'address',
            },
            {
              fieldName: 'age',
            },
            {
              fieldName: 'tags',
              width: 300
            },
          ]
        }
      }
    ]
  }
  return (
    <div style={{ margin: 10 }}>
      <SmartTable
        tableKey="MultiViewUse"
        schema={tableSchema}
        dataSource={dataSource}
      />
    </div>
  )
}

function LocalUse() {
  const initalLocale = {
    sysView: '自定义-System view',
    companyView: '自定义-Company view',
    customView: '自定义-Custom view',
  }
  const [i18n, setI18n] = useState('en-US')
  const [customLocale, setCustomLocale] = useState(false)
  return (
    <div style={{ margin: 10 }}>
      <div style={{ marginBottom: 10 }}>
        <p><span>自定义local：</span><Switch checked={customLocale} onChange={(checked) => { setCustomLocale(checked) }} /></p>
        <Radio.Group size='small' onChange={(e) => setI18n(e.target.value)} value={i18n}>
          <Radio.Button value={'en-US'}>英文</Radio.Button>
          <Radio.Button value={'zh-CN'}>中文</Radio.Button>
        </Radio.Group>
      </div>
      <SmartTable
        i18n={i18n}
        locale={customLocale ? initalLocale : null}
        onReload={() => { }}
        tableKey="BasicUse"
        schema={tableColumns}
        dataSource={dataSource}
      />
    </div>
  )
}


const config = {
  codes: code,
  useage: `
    对于一组业务对象，不同用户在不同的时间期望看到不同的视图展现，我们需要一种机制把权利交给用户<br/>
    <b>🧮 支持动态配置列属性</b><br/>
    对于用户不同的显示要求，用户可以自由配置决定列的显示与否、列的排序、固定、对齐方式等<br/>
    <b>🎭 支持动态配置表格样式属性</b><br/>
    用户可以自由配置文字是否限制折行、是否显示斑马线、是否显示列边框、分页条位置、高度策略<br/>
    <b>🤹🏻‍♂️ 多视图动态切换</b><br/>
    你可以选择把视图信息保存在本地或者远程，用户可以迅速切换到自己期望的视图<br/>
`,
  // inline: true,
  children: [
    {
      title: '基本用法',
      describe: '最简单的用法，鼠标悬浮表格可配置视图。<br/>简洁数据模型，数组格式，快速实现表格展示。列数据不应包含UI配置信息。',
      cmp: BasicUse
    },
    {
      title: '动态配置列属性用法',
      describe: '配置列属性，包括显示与否、列的排序、固定、对齐方式等。<br/>此处预设隐藏 <b>年龄</b> 字段, 并将 <b>标签</b> 列放置第一列。',
      cmp: ConfigColumnsUse
    },
    {
      title: '动态配置表格样式属性用法',
      describe: '配置表格样式，包括文字是否限制折行、是否显示斑马线、是否显示列边框、分页条位置、高度策略等。<br/>此处预设 不换行 、不显示斑马线、 不显示边框、 取消点击选中行、 分页条放右边、 表格高度适应内容。',
      cmp: ConfigDisplayUse
    },
    {
      title: '多视图动态切换用法',
      describe: '配置多个视图配置，可以快速动态切换。',
      cmp: MultiViewUse
    },
    {
      title: '国际化用法',
      describe: '可进行语言的切换，同时支持自定义',
      cmp: LocalUse
    },
    {
      title: '行内编辑用法',
      describe: '可进行编辑状态的切换，一键进入编辑模式',
      cmp: EditInlineUse
    }
  ]
};

export default () => <CodeDecorator config={config} />