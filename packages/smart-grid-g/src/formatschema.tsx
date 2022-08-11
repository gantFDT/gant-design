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
import { isEmpty, pick, merge, get, omit } from 'lodash';
import { SchemaProp, PanelConfig, CustomColumnProps, ColumnConfig, Fields } from './interface';
import { getType } from '@util';

const ComponentsMap = {
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
  let fakeColumn = { ...schema };
  if (!schema.render) {
    if (schema.componentType) {
      if (getType(schema.componentType) !== 'String') {
        fakeColumn.render = () => schema.componentType as React.ReactElement;
      } else {
        const Cmp = ComponentsMap[schema.componentType as Fields];
        if (Cmp) {
          fakeColumn.render = value => React.createElement(Cmp, {
            ...schema.props,
            value,
            allowEdit: false,
            style: merge(get(schema.props, 'style'), { display: 'inline-block' })
          })
          fakeColumn.editConfig = {
            component: Cmp,
            editable: true,
            ...fakeColumn.editConfig
          }
        } else {
          try {
            fakeColumn.render = value => React.createElement('span', {}, JSON.stringify(value))
          } catch{
            throw `字段（${schema.fieldName}）的值解析出错。`
          }
        }
      }
    }
    delete fakeColumn.componentType;
  }
  if (fakeColumn.children && !isEmpty(fakeColumn.children)) {
    fakeColumn.children = fakeColumn.children.map((childColumn: CustomColumnProps<R>) =>
      formatColumn(childColumn),
    );
  }
  return fakeColumn;
}

export const setFields = (cmpMap) => {
  Object.assign(ComponentsMap, cmpMap)
}

export const formatColumnFields = (columnFields, originColumns) => {
  // 剔除原始数据中不存在的数据列
  const __filterdFields = [];
  for (const columnField of columnFields) {
    const _columnItem = originColumns.find(_column => _column.fieldName === columnField.fieldName);
    if(_columnItem) {
      __filterdFields.push(Object.assign({},
        omit(_columnItem, ['hide', 'width', 'fixed', 'sort', 'sortIndex']), // 防止出现配置视图被覆盖的情况
        columnField,
        { hide: columnField.hide ?? false }
      ))
    }
  }
  // 添加视图中隐藏的列
  const __hiddenFields = [];
  for (const _column of originColumns) {
    if(__filterdFields.every(__filterdField => __filterdField.fieldName !== _column.fieldName)) {
      __hiddenFields.push(Object.assign({},
        _column,
        { hide: !_column.dynamic ?? true }
      ))
    }
  }

  return [...__filterdFields, ...__hiddenFields];
}

export default function formatSchema<R>(schema: SchemaProp<R> | CustomColumnProps<R>[], originGridKey: string | undefined, locale: any=null,smartGridViewName?: string) {
  // 简洁模式
  if (Array.isArray(schema)) {
    schema = {
      supportColumnFields: schema,
      systemViews: [
        {
          viewId: originGridKey ? `system-${originGridKey}` : 'system',
          name: smartGridViewName? smartGridViewName : locale ? locale.fullField : '全字段',
          version: 'default',
          panelConfig: {
            columnFields: schema.map(column => pick(column, ['fieldName', 'hide', 'width', 'fixed', 'sort', 'sortIndex'])),
          },
        },
      ],
    };
  }

  
  const { supportColumnFields: columnFields, systemViews } = schema;

  // 转换组件类型后的列数据
  const columns: CustomColumnProps<R>[] = [];
  columnFields.forEach(column => {
    if (!column.fieldName || !column.title) {
      throw new Error('SmartGrid的schema格式错误!');
    }
    const columnData = formatColumn(column); // 映射componentType
    columns.push(columnData);
  });

  // 默认的列配置数据
  const columnConfigs: ColumnConfig[] = columns.map(_column => ({
    ..._column,
    hide: false
  }));

  // 匹配系统视图
  systemViews.forEach(view => {
    Object.assign(view.panelConfig, {
      columnFields: formatColumnFields(view.panelConfig.columnFields, columns)
    })
  });

  return {
    columns,
    columnConfigs,
    systemViews,
  };
}
