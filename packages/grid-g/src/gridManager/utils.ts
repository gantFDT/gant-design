import { get, isEmpty, isEqual, findIndex, cloneDeep } from 'lodash';
import { DataActions, CreateConfig } from '../interface';
import { generateUuid } from '@util';
import { RowNode } from 'ag-grid-community';
export function getModifyData(records, getRowItemData, oldRecords) {
  const hisRecords: any[] = [],
    newRecords: any[] = [];
  records.map((item, index) => {
    var { data } = getRowItemData(item, get(oldRecords, `[${index}]`, undefined));
    data = cloneDeep(data);
    if (isEqualObj(data, item)) return;
    let { _rowData, _rowType = null, ...oldData } = data;
    let { _rowData: nextRowData, _rowType: nextRowType, ...newData } = item;
    if (nextRowType === DataActions.remove || nextRowType === DataActions.removeTag)
      return console.warn('Cannot modify deleted data');
    _rowData = isEmpty(_rowData) ? oldData : _rowData;
    const hasChange = !isEqualObj(_rowData, newData);
    _rowType =
      !_rowType || _rowType === DataActions.modify
        ? hasChange
          ? DataActions.modify
          : null
        : _rowType;
    let recordItem = { ...newData, _rowData, _rowType };
    let hisRecordItem = { ...data, _nextRowData: recordItem };
    newRecords.push(recordItem);
    hisRecords.push(hisRecordItem);
  });
  return { newRecords, hisRecords };
}

export function removeTagData(records, rowData, getRowNodeId) {
  const hisRecords: any[] = [],
    newRecords: any[] = [],
    removeRecords: any[] = [],
    removeIndexs: any[] = [];
  records.map(itemData => {
    let recordItem = { ...itemData, _rowType: DataActions.removeTag };
    if (itemData._rowType === DataActions.removeTag || itemData._rowType === DataActions.remove)
      return console.warn('Deleted data cannot be deleted');
    const removeIndex = findIndex(rowData, data => getRowNodeId(data) === getRowNodeId(itemData));
    let hisRecordItem = { ...itemData, _nextRowData: recordItem };
    itemData._rowType !== DataActions.add
      ? newRecords.push(recordItem)
      : removeRecords.push(itemData);

    removeIndexs.unshift(removeIndex);
    hisRecords.unshift(hisRecordItem);
  });
  return { newRecords, hisRecords, removeIndexs, removeRecords };
}

const isEmptyObj = value => {
  if (typeof value === 'number') return false;
  if (typeof value === 'object') return isEmpty(value);
  return !value;
};
export const isEqualObj = (obj, obj2) => {
  let _EqualObj = true;
  const newObj = { ...obj, ...obj2 };
  if (Array.isArray(obj) || typeof obj !== 'object') {
    if (isEmptyObj(obj) && isEmptyObj(obj2)) return true;
    return isEqual(obj, obj2);
  }
  for (let i in newObj) {
    let value1 = get(obj, i),
      value2 = get(obj2, i);
    if (
      typeof value1 === 'object' &&
      typeof value2 === 'object' &&
      !Array.isArray(value1) &&
      !Array.isArray(value2)
    ) {
      _EqualObj = isEqualObj(value1, value2);
    } else {
      if (!(isEmptyObj(value1) && isEmptyObj(value2))) {
        value2 = typeof value2 == 'number' ? value2 : value2 + '';
        value1 = typeof value1 == 'number' ? value1 : value1 + '';
        _EqualObj = isEqual(value2, value1);
      }
    }
    if (!_EqualObj) return _EqualObj;
  }
  return true;
};
export function canQuickCreate(config: CreateConfig) {
  if (isEmpty(config)) return false;
  const arr = ['id', 'path', 'toPath'];
  try {
    for (let index = 0; index < arr.length; index++) {
      if (!Reflect.has(config, arr[index])) return false;
    }
  } catch (error) {
    return false;
  }
  return true;
}
export function isSelectionParentOfTarget(selectedNode, targetNode) {
  let children = selectedNode.childrenAfterGroup;
  for (let i = 0; i < children.length; i++) {
    if (targetNode && children[i].key === targetNode.key) return true;
    isSelectionParentOfTarget(children[i], targetNode);
  }
  return false;
}
export function getRowsToUpdate(nodes, parentPath, createConfig, agGridConfig) {
  let res = [];
  let oldRowData = [];
  const { path, toPath, id } = createConfig;
  nodes.map(node => {
    let itemData = cloneDeep(node.data);
    let newPath = [];
    if (node.data) {
      node.data[path] = toPath(parentPath, node.data);
      newPath = agGridConfig.getDataPath(node.data);
    }
    if (node.childrenAfterGroup) {
      let { newRowData: childrenNewRowData, oldRowData: childrenOldRowData } = getRowsToUpdate(
        node.childrenAfterGroup,
        newPath,
        createConfig,
        agGridConfig,
      );
      res = res.concat(childrenNewRowData);
      oldRowData = oldRowData.concat(childrenOldRowData);
    }
    if (node.data) {
      const { _rowCut, ...data } = node.data;
      res = res.concat([data]);
      oldRowData = oldRowData.concat([itemData]);
    }
  });
  return { newRowData: res, oldRowData };
}

// 标记剪切
export function onSetcutData(rowsNodes: RowNode[], clear?: boolean) {
  const update: any[] = [];
  rowsNodes.map(item => {
    const { childrenAfterGroup } = item;
    let data: object = cloneDeep(item.data);
    data = { ...data, _rowCut: !clear };
    if (item.data) update.push(data);
    item.setSelected(false);
    if (childrenAfterGroup) {
      const childrenData = onSetcutData(childrenAfterGroup, clear);
      update.push(...childrenData);
    }
  });
  return update;
}
