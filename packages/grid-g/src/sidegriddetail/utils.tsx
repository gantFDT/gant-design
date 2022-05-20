import { get, set, isArray, cloneDeep } from 'lodash';

//通过grid行转列, 即数据
export const getTransData = (columns, data) => {
  const res = [];
  const setPropertyType = currentColumn => {
    if (!currentColumn || !get(currentColumn, 'fieldName')) {
      return;
    }
    if (isArray(currentColumn.children)) {
      currentColumn.children.forEach((c: any) => {
        setPropertyType(c);
      });
      return;
    }
    const { fieldName, title, props, componentType } = currentColumn;
    res.push({
      fieldName,
      label: title,
      value: get(data, fieldName),
    });
  };
  columns.forEach(column => {
    setPropertyType(column);
  });
  return res;
};

//把column转成平行对象
export const transColumnsToObj = columns => {
  const res = {};
  const setPropertyType = currentColumn => {
    if (!currentColumn || !get(currentColumn, 'fieldName')) {
      return;
    }
    if (isArray(currentColumn.children)) {
      currentColumn.children.forEach((c: any) => {
        setPropertyType(c);
      });
      return;
    }
    const { fieldName } = currentColumn;

    set(res, `${fieldName}`, currentColumn);
    res[fieldName] = currentColumn;
  };
  columns.forEach(column => {
    setPropertyType(column);
  });
  return res;
};

//广度优先查找columnDef
export const getColDef = (columnDefs, fieldName) => {
  let res = {};
  const q = columnDefs;
  while (q.length) {
    const n = q.shift();
    if (n.field === fieldName) {
      res = n;
      q.length = 0;
      break;
    }
    n.children &&
      n.children.forEach((item: any) => {
        q.push(item);
      });
  }
  return res;
};

//获取值的valueGetter
export const getValueGetter = (params: any) => {
  const { fieldName, columnField, clickedEvent, cellValue } = params;

  const { valueGetter, valueFormatter, render } = columnField;
  const { columnApi, data: _data, api, context, node, rowIndex } = clickedEvent;
  const {
    columnModel: { displayedColumnsAndGroupsMap },
  } = columnApi;
  const colDef = columnField;
  const column = get(displayedColumnsAndGroupsMap, fieldName);

  const temp = cloneDeep(_data);
  const data = set(temp, fieldName, cellValue);

  const getValue = field => {
    return get(data, field);
  };
  const value = cellValue;

  let res = value;
  if (valueGetter) {
    res = valueGetter({
      api,
      colDef,
      column,
      columnApi,
      context,
      data,
      getValue,
      node,
    });
  }
  return res;
};

export const getInitValueFormatter = (params: any) => {
  const { fieldName, columnField, clickedEvent, cellValue } = params;

  const initValueFormatter = get(columnField, 'editConfig.initValueFormatter');
  const { columnApi, data: _data, api, context, node, rowIndex } = clickedEvent;
  const {
    columnModel: { displayedColumnsAndGroupsMap },
  } = columnApi;
  const colDef = columnField;
  const column = get(displayedColumnsAndGroupsMap, fieldName);

  const temp = cloneDeep(_data);
  const data = set(temp, fieldName, cellValue);
  const value = cellValue;

  let res = value;
  if (initValueFormatter) {
    res = initValueFormatter({
      api,
      colDef,
      column,
      columnApi,
      context,
      data,
      node,
    });
  }
  return res;
};

//获取值的渲染
export const getValueRender = (params: any) => {
  const { fieldName, columnField, clickedEvent, cellValue } = params;
  const { valueGetter, valueFormatter, render } = columnField;
  const { columnApi, data: _data, api, context, node, rowIndex } = clickedEvent;
  const {
    columnModel: { displayedColumnsAndGroupsMap },
  } = columnApi;
  const colDef = columnField;
  const column = get(displayedColumnsAndGroupsMap, fieldName);
  const temp = cloneDeep(_data);
  const data = set(temp, fieldName, cellValue);
  const getValue = field => {
    return get(data, field);
  };
  const value = cellValue;
  let res = value;
  if (valueFormatter) {
    res = valueFormatter({
      api,
      colDef,
      column,
      columnApi,
      context,
      data,
      getValue,
      node,
      value,
    });
  }
  if (render) {
    res = render(value, data, rowIndex, clickedEvent);
  }
  return res;
};

//计算某行是否可以编辑
export const getEditable = params => {
  const { columnField, clickedEvent } = params;
  const { data } = clickedEvent;
  const { editConfig = {} } = columnField;
  const { editable } = editConfig;
  if (typeof editable === 'boolean') {
    return editable;
  }
  if (typeof editable === 'function') {
    return editable(data, clickedEvent);
  }
  return false;
};

//计算对象的diff属性,若差异为对象，则key用.连接符
export const getDiffProps = (srcObj, targetObj) => {
  let res = {};
  const getDiff = (srcChild, targetChild, path = '') => {
    if (!srcChild || !targetChild) {
      return null;
    }
    for (let key in srcChild) {
      const srcItem = srcChild[key];
      const targetItem = targetChild[key];
      if (srcItem !== targetItem) {
        let p = path;
        if (!p) {
          p = key;
        } else {
          p = p + '.' + key;
        }
        if (typeof srcItem === 'object') {
          getDiff(srcItem, targetItem, p);
        } else {
          res[p] = targetItem;
        }
      }
    }
  };
  getDiff(srcObj, targetObj);
  return res;
};

//获取原数据
export const getOriginData = data => {
  const { _rowData, _rowType, _rowError, ...targetData } = data;
  let originData = _rowData;
  if (!originData) {
    originData = targetData;
  }
  return originData;
};
