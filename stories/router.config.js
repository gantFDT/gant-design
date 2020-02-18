export default [{
  name: "GantD|介绍",
  children: [{
    name: 'Idea',
    nameZh: '理念'
  }]
}, {
  name: "组件|数据单元",
  children: [
    {
      name: 'Input',
      nameZh: '文本输入框'
    },
    {
      name: 'InputCellPhone',
      nameZh: '手机号输入框'
    },
    {
      name: 'InputTelephone',
      nameZh: '电话输入框'
    },
    {
      name: 'InputUrl',
      nameZh: '链接输入框'
    },
    {
      name: 'InputEmail',
      nameZh: '邮箱输入框'
    },
    {
      name: 'InputLanguage',
      nameZh: '语言类型输入框'
    },
    {
      name: 'InputNumber',
      nameZh: '数字输入框'
    },
    {
      name: 'InputMoney',
      nameZh: '金额输入框'
    },
    {
      name: 'selector',
      nameZh: '基础选择器'
    },
    {
      name: 'LocationSelector',
      nameZh: '地址选择器'
    },
    {
      name: 'datepicker',
      nameZh: '日期选择器'
    },
    {
      name: 'ColorPicker',
      nameZh: '颜色选择器',
      package: 'color-picker-g',
    },
    {
      name: 'IconSelector',
      nameZh: '图标选择器',
    },
  ]

  // }, {
  // 	name: "components|Compose 高阶组件",
  // 	children: [
  // 		{
  // 			name: 'anchor',
  // 			nameZh: '锚点'
  // 		}
  // 	]
  // }, {
  // 	name: "components|Specific 特殊",
  // 	children: [
  // 		,
  // 		{
  // 			name: "FiledSchema",
  // 			nameZh: "属性配置"
  // 		},
  // 		{
  // 			name: "Copy",
  // 			nameZh: "剪切板"
  // 		}
  // 	]
},
{
  name: "组件| 表单",
  children: [
    {
      name: 'SchemaForm',
      nameZh: '表单'
    },
  ]
}, {
  name: "组件| 列表",
  children: [
    {
      name: 'Table',
      nameZh: '表格',
      package: 'table-g',
    },
  ]
}, {
  name: "组件|容器",
  children: [{
    name: 'Header',
    nameZh: '标头',
    package: 'header-g',
  },
  {
    name: 'SubMenu',
    nameZh: '子菜单',
    package: 'submenu-g',
  },
  {
    name: 'Anchor',
    nameZh: '锚点',
    package: 'anchor-g',
  },
  {
    name: 'Modal',
    nameZh: '弹窗',
    package: 'auto-modal-g',
  },{
    name: 'Toolbar',
    nameZh: '工具条',
  }
    // {
    // 	name: 'OverflowTool',
    // 	nameZh: '子菜单',
    // 	package: 'overflow-tool-g',
    // 	nameZh: '溢出工具组',
    // 	package: 'overflow-tool-g',
    // },
    // 		{
    // 			name: 'FooterToolbar',
    // 			nameZh: '底部固定工具栏'
    // 		}
  ]
}, {
  name: '组件|其他',
  children: [{
    name: 'AutoReload',
    nameZh: '自动刷新组件',
    package: 'auto-reload-g',
  }, {
    name: 'Intro',
    nameZh: '简介'
  },{
    name: 'Icon',
    nameZh: '图标'
  }
    // {
    // 			name: 'TaskBoard',
    // 			nameZh: '任务面板'
    // 		}
    // {
    // 	name: 'Exception',
    // 	nameZh: '异常显现'
    // },
    // {
    // 	name: 'PageLoading',
    // 	nameZh: '页面加载显示'
    // },
    // {
    // 	name: 'ProfileCard',
    // 	nameZh: '档案卡片'
    // }]
  ]
}, {
  name: '组件|实验',
  children: [
    //   {
    //   name: 'Copy',
    //   nameZh: '复制行数据'
    // }
  ]
}, {
  name: '组件|废弃',
  children: [{
    name: 'VisibleMenu',
    nameZh: '动态列'
  }]
}]
