import React from 'react'
import { Switch, Input as AntInput } from 'antd'
import { Input, InputNumber, DatePicker, Selector, InputUrl, LocationSelector, InputTelePhone, InputCellPhone, InputEmail, InputLanguage, InputMoney } from '@data-cell'
import { isEmpty, cloneDeep } from 'lodash'
import { SchemaProp, PanelConfig, CustomColumnProps, ColumnConfig } from './interface'
import { getType } from '@util'

const DEFAULT_VIEW: PanelConfig = {
  wrap: true,
  isZebra: true,
  bordered: true,
  clickable: true,
  footerDirection: 'row',
  heightMode: 'full',
  pageSize: 50,
  columnFields: []
}

const mapComponents = (ComponentName: string, props: any) => {
  if (ComponentName && getType(ComponentName) !== 'String') {
    return ComponentName;
  }
  switch (ComponentName) {
    case 'Input': return <AntInput {...props} />
    case 'Switch': return <Switch {...props} />
    case 'TextArea': return <AntInput.TextArea {...props} />
    // Gant
    case 'InputNumber': return <InputNumber  {...props} />;
    case 'DatePicker': return <DatePicker {...props} />;
    case 'Selector': return <Selector {...props} />;
    case 'InputUrl': return <InputUrl {...props} />;
    case 'LocationSelector': return <LocationSelector  {...props} />;
    case 'InputTelePhone': return <InputTelePhone {...props} />;
    case 'InputCellPhone': return <InputCellPhone {...props} />;
    case 'InputEmail': return <InputEmail {...props} />;
    case 'InputLanguage': return <InputLanguage {...props} />;
    case 'InputMoney': return <InputMoney {...props} />;
    default: return <Input {...props} />
  }
};

interface FormatColumnProps<R> extends CustomColumnProps<R> {
  editConfig?: {render?: (text: any, record: R, index: number) => React.ReactNode;}
}
function formatColumn<R>(schema: FormatColumnProps<R>) {
  let fakeColumn = { dataIndex: schema.fieldName, ...schema };
  if (!schema.render) {
    switch (schema.componentType) {
      case 'Input':
      case 'Switch':
      case 'TextArea':
        fakeColumn.render = (text) => mapComponents(schema.componentType, {
          ...schema.props,
          value: text
        })
        break;
      case 'InputNumber':
      case 'DatePicker':
      case 'Selector':
      case 'InputUrl':
      case 'LocationSelector':
      case 'InputTelePhone':
      case 'InputCellPhone':
      case 'InputEmail':
      case 'InputLanguage':
      case 'InputMoney':
        fakeColumn.render = (text) => mapComponents(schema.componentType, {
          ...schema.props,
          value: text,
          allowEdit: false
        })
        fakeColumn.editConfig = {
          render: () => {
            return mapComponents(schema.componentType, {...schema.props})
          },
        }
        break;
      default:
        break;
    }
  }
  if (fakeColumn.children && !isEmpty(fakeColumn.children)) {
    fakeColumn.children = fakeColumn.children.map((childColumn: CustomColumnProps<R>) => formatColumn(childColumn))
  }
  return fakeColumn;
}

export default function formatSchema<R>(schema: SchemaProp<R> | CustomColumnProps<R>[]) {
  // 简洁模式
  if(Array.isArray(schema)){
    schema = {
      supportColumnFields: schema,
      systemViews: [
        {
          viewId: 'systemView',
          name: "系统视图",
          version: 'default',
          panelConfig: {
            columnFields: schema.map(column => ({
              fieldName: column.fieldName,
              width: column.width,
              align: column.align,
              fixed: column.fixed,
            }))
          }
        },
      ]
    }
  }

  const {
    supportColumnFields: columnFields,
    systemViews
  } = schema;

  // 转换组件类型后的列数据
  let columns: CustomColumnProps<R>[] = [];
  let columnMaps: {[fieldName: string]: CustomColumnProps<R>} = {};
  columnFields.forEach(column => {
    if (!column.fieldName || !column.title) {
      throw new Error('SmartTable的schema格式错误，参照：https://gant.yuque.com/fdt/gantreact/hyeday')
    }
    if (column.width || column.align || column.fixed) {
      console.warn('SmartTable的schema在简洁模式下，不能包含UI属性，参照：https://gant.yuque.com/fdt/gantreact/hyeday')
    }
    const columnData = formatColumn(column);
    columns.push(columnData);
    columnMaps[column.fieldName] = columnData;
  })

  // 默认的列配置数据
  const columnConfigs: ColumnConfig[] = columns.map(C => ({...C, checked: true,align: 'left',lock: false}))

  // 匹配系统视图
  systemViews.forEach(view=>{
    let configs = cloneDeep(columns);
    let { columnFields: columnConfigs } = view.panelConfig;

    for (let idx = 0; idx < columnConfigs.length; idx++) {
      const columnConfig = columnConfigs[idx];
      columnConfigs[idx] = {
        ...columnMaps[columnConfig.fieldName],
        ...columnConfig,
        checked: true,
        align: columnConfig.align || 'left',
        lock: !!columnConfig.fixed || false
      }
    }

    // 隐藏列
    let hiddenColumns = configs.filter(C => columnConfigs.every(CC => CC.fieldName!== C.fieldName)).map(C => ({
      ...C,
      checked: false,
      align: 'left',
      lock: false
    }))
    columnConfigs = [...columnConfigs, ...hiddenColumns] as ColumnConfig[];

    view.panelConfig = {
      ...DEFAULT_VIEW,
      ...view.panelConfig,
      columnFields: columnConfigs
    }
  })

  return {
    columns,
    columnConfigs,
    systemViews,
  }
}