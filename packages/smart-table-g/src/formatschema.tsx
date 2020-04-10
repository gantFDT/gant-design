import React from 'react';
import {
  Input,
  InputNumber,
  DatePicker,
  Selector,
  InputUrl,
  LocationSelector,
  InputTelePhone,
  InputCellPhone,
  InputEmail,
  InputLanguage,
  InputMoney,
} from '@data-cell';
import { isEmpty, cloneDeep, merge, get } from 'lodash';
import { SchemaProp, PanelConfig, CustomColumnProps, ColumnConfig, Fields } from './interface';
import { getType } from '@util';

const DEFAULT_VIEW: PanelConfig = {
  wrap: true,
  isZebra: true,
  bordered: true,
  clickable: true,
  footerDirection: 'row',
  heightMode: 'full',
  pageSize: 50,
  columnFields: [],
};

let ComponentsMap = {
  [Fields.Input]: Input,
  [Fields.InputNumber]: InputNumber,
  [Fields.InputUrl]: InputUrl,
  [Fields.InputTelePhone]: InputTelePhone,
  [Fields.InputCellPhone]: InputCellPhone,
  [Fields.InputEmail]: InputEmail,
  [Fields.InputLanguage]: InputLanguage,
  [Fields.InputMoney]: InputMoney,
  [Fields.TextArea]: Input.TextArea,
  [Fields.DatePicker]: DatePicker,
  [Fields.Selector]: Selector,
  [Fields.LocationSelector]: LocationSelector
}

function formatColumn<R>(schema: CustomColumnProps<R>) {
  let fakeColumn = { dataIndex: schema.fieldName, ...schema };
  if (!schema.render) {
    if(schema.componentType){
      if(getType(schema.componentType) !== 'String'){
        fakeColumn.render = () => schema.componentType;
      }else{
        const Cmp = ComponentsMap[schema.componentType];
        if(Cmp){
          fakeColumn.render = value => React.createElement(Cmp, {
            ...schema.props,
            value,
            allowEdit: false,
            style: merge(get(schema.props, 'style'), { display: 'inline-block' })
          })
          fakeColumn.editConfig = {
            render: () => {
              return React.createElement(Cmp, schema.props)
            },
          }
        }else{
          try {
            fakeColumn.render = value => React.createElement('span', {}, JSON.stringify(value))
          }catch{
            throw `字段（${schema.fieldName}）的值解析出错。`
          }
        }
      }
    }
  }
  if (fakeColumn.children && !isEmpty(fakeColumn.children)) {
    fakeColumn.children = fakeColumn.children.map((childColumn: CustomColumnProps<R>) =>
      formatColumn(childColumn),
    );
  }
  return fakeColumn;
}

export const setFields = (cmpMap) => {
  ComponentsMap = {...ComponentsMap, ...cmpMap }
}

export default function formatSchema<R>(schema: SchemaProp<R> | CustomColumnProps<R>[]) {
  // 简洁模式
  if (Array.isArray(schema)) {
    schema = {
      supportColumnFields: schema,
      systemViews: [
        {
          viewId: 'systemView',
          name: '系统视图',
          version: 'default',
          panelConfig: {
            columnFields: schema.map(column => ({
              fieldName: column.fieldName,
              width: column.width,
              align: column.align,
              fixed: column.fixed,
            })),
          },
        },
      ],
    };
  }

  const { supportColumnFields: columnFields, systemViews } = schema;

  // 转换组件类型后的列数据
  let columns: CustomColumnProps<R>[] = [];
  let columnMaps: { [fieldName: string]: CustomColumnProps<R> } = {};
  columnFields.forEach(column => {
    if (!column.fieldName || !column.title) {
      throw new Error(
        'SmartTable的schema格式错误，参照：https://gant.yuque.com/fdt/gantreact/hyeday',
      );
    }
    if (column.width || column.align || column.fixed) {
      console.warn(
        'SmartTable的schema在简洁模式下，不能包含UI属性，参照：https://gant.yuque.com/fdt/gantreact/hyeday',
      );
    }
    const columnData = formatColumn(column);
    columns.push(columnData);
    columnMaps[column.fieldName] = columnData;
  });

  // 默认的列配置数据
  const columnConfigs: ColumnConfig[] = columns.map(C => ({
    ...C,
    checked: true,
    align: 'left',
    lock: false,
  }));

  // 匹配系统视图
  systemViews.forEach(view => {
    let configs = cloneDeep(columns);
    let { columnFields: columnConfigs } = view.panelConfig;

    for (let idx = 0; idx < columnConfigs.length; idx++) {
      const columnConfig = columnConfigs[idx];
      columnConfigs[idx] = {
        ...columnMaps[columnConfig.fieldName],
        ...columnConfig,
        checked: true,
        align: columnConfig.align || 'left',
        lock: !!columnConfig.fixed || false,
      };
    }

    // 隐藏列
    let hiddenColumns = configs
      .filter(C => columnConfigs.every(CC => CC.fieldName !== C.fieldName))
      .map(C => ({
        ...C,
        checked: false,
        align: 'left',
        lock: false,
      }));
    columnConfigs = [...columnConfigs, ...hiddenColumns] as ColumnConfig[];

    view.panelConfig = {
      ...DEFAULT_VIEW,
      ...view.panelConfig,
      columnFields: columnConfigs,
    };
  });

  return {
    columns,
    columnConfigs,
    systemViews,
  };
}
