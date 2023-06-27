import {
  get,
  isEmpty,
  isEqual,
  findIndex,
  cloneDeep,
  groupBy,
  uniqBy,
  min,
  isPlainObject,
  filter,
  isNull,
} from 'lodash';
import { DataActions, CreateConfig } from '../interface';
import { generateUuid } from '@util';
import { RowNode, GridApi, ColGroupDef, ColDef } from 'ag-grid-community';
export function getModifyData(records, getRowItemData, oldRecords, getRowNodeId) {
  const hisRecords: any[] = [],
    newRecords: any[] = [];
  records.map((item, index) => {
    const oldIndex = findIndex(oldRecords, oldItem => getRowNodeId(oldItem) === getRowNodeId(item));
    const rowNode = getRowItemData(item, get(oldRecords, `[${oldIndex}]`, undefined));
    if (!rowNode || isEqualObj(rowNode.data, item)) return;
    const { data } = rowNode;
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
    let hisRecordItem = data;
    newRecords.push(recordItem);
    hisRecords.push(hisRecordItem);
  });
  return { newRecords, hisRecords };
}

export function removeTagData(removeNodes: RowNode[], rowData: any[], getRowNodeId: any) {
  const hisRecords: any[] = [],
    newRecords: any[] = [],
    removeRecords: any[] = [],
    removeIndexs: any[] = [];
  removeNodes.map(itemNode => {
    const itemData = get(itemNode, 'data', {});
    let recordItem = { ...itemData, _rowType: DataActions.removeTag, _rowData: itemData };
    if (itemData._rowType === DataActions.removeTag || itemData._rowType === DataActions.remove)
      return console.warn('Deleted data cannot be deleted');
    let hisRecordItem = { ...itemData };
    itemData._rowType !== DataActions.add
      ? newRecords.push(recordItem)
      : removeRecords.push(itemData);
    const rowIndex = findIndex(
      rowData,
      rowItemData => getRowNodeId(rowItemData) === getRowNodeId(itemData),
    );
    removeIndexs.unshift(rowIndex);
    hisRecords.unshift(hisRecordItem);
  });
  return { newRecords, hisRecords, removeIndexs, removeRecords };
}

export const isEmptyObj = value => {
  if (typeof value === 'boolean') return false;
  if (typeof value === 'number') return false;
  if (typeof value === 'object') return isEmpty(value);
  return !value;
};
export const isEqualObj = (obj, obj2) => {
  let _EqualObj = true;
  if (!isPlainObject(obj) || !isPlainObject(obj2)) {
    if (isEmptyObj(obj) && isEmptyObj(obj2)) return true;
    return isEqual(obj, obj2);
  }
  if (isNull(obj) && isNull(obj2)) return true;
  if (isNull(obj) || isNull(obj2)) {
    return false;
  }
  const newObj = { ...obj, ...obj2 };
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
        value2 = typeof value2 !== 'number' ? value2 : value2 + '';
        value1 = typeof value1 !== 'number' ? value1 : value1 + '';
        if (typeof value1 === 'boolean' || typeof value2 === 'boolean') {
          value1 = !!value1;
          value2 = !!value2;
        }
        _EqualObj = isEqual(value2, value1);
      }
    }
    if (!_EqualObj) {
      return _EqualObj;
    }
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
      itemData[path] = toPath(parentPath, itemData);
      newPath = agGridConfig.getDataPath(itemData);
      const { _rowCut, ...data } = itemData;
      res = res.concat([data]);
      oldRowData = oldRowData.concat([node.data]);
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

export function getAllChildrenNode(
  targetKeys: any[],
  api: GridApi,
  deleteChildren = false,
): RowNode[] {
  const targetNodes: RowNode[] = [];
  targetKeys.map(key => {
    const itemNode = api.getRowNode(key);
    itemNode && targetNodes.push(itemNode);
  });
  if (deleteChildren) return targetNodes;
  const allNodes: RowNode[] = [];
  const groupNodes = groupBy(targetNodes, 'level');
  let level = min(Object.keys(groupNodes).map(level => level));
  while (!isEmpty(groupNodes[level])) {
    const list = groupNodes[level];
    let nextLevel: any = parseInt(level) + 1;
    nextLevel = nextLevel.toString();
    groupNodes[nextLevel] = groupNodes[nextLevel] ? groupNodes[nextLevel] : [];
    list.map(itemNode => {
      const { childrenAfterGroup = [] } = itemNode as RowNode;
      groupNodes[nextLevel].push(...childrenAfterGroup);
      return itemNode.data;
    });
    groupNodes[nextLevel] = uniqBy(groupNodes[nextLevel], 'id');
    allNodes.push(...list);
    level = nextLevel;
  }
  return allNodes;
}
function findColumnIndex(itemCol, localColumns) {
  const itemIndex = findIndex(
    localColumns,
    localItemCol =>
      get(localItemCol, 'colId') === get(itemCol, 'colId') ||
      get(localItemCol, 'colId') === get(itemCol, 'field'),
  );
  return itemIndex;
}
function getColumnItem(itemCol) {
  if (Array.isArray(itemCol.children) && itemCol.children.length >= 0)
    return getColumnItem(get(itemCol, 'children[0]', itemCol));
  return itemCol;
}
export function sortAndMergeColumns(
  columns: any[],
  localColumns: (ColGroupDef | ColDef)[],
): (ColGroupDef | ColDef)[] {
  return columns
    .map(itemCol => {
      const itemIndex = findColumnIndex(itemCol, localColumns);
      if (itemCol.children)
        itemCol.children = sortAndMergeColumns(get(itemCol, 'children', []), localColumns);
      if (itemIndex > -1)
        return {
          ...itemCol,
          ...get(localColumns, `[${itemIndex}]`),
          pivotIndex: itemIndex,
          sortIndex: itemIndex,
        };
      return itemCol;
    })
    .sort((aitem: any, bitem: any) => {
      const aIndex = findColumnIndex(getColumnItem(aitem), localColumns);
      const bIndex = findColumnIndex(getColumnItem(bitem), localColumns);
      return aIndex - bIndex;
    });
}
export function getAllCoumns(columns: any[], parendId?: string) {
  const _columns: any[] = [];
  columns.map(item => {
    _columns.push(item);
    if (Array.isArray(item.children))
      return _columns.push(...getAllCoumns(item.children, item.field));
  });
  return _columns;
}

export function replaceRowData({
  rowData,
  targetData,
  newData,
  getRowNodeId,
  up,
}: {
  rowData: any[];
  targetData: any;
  newData: any[];
  getRowNodeId: any;
  up: boolean;
}): any[] {
  const targetIndex = findIndex(
    rowData,
    itemData => getRowNodeId(targetData) === getRowNodeId(itemData),
  );
  const newDataSource = up
    ? [...rowData.slice(0, targetIndex), ...newData, ...rowData.slice(targetIndex)]
    : [
        ...rowData.slice(0, targetIndex),
        rowData[targetIndex],
        ...newData,
        ...rowData.slice(targetIndex + 1),
      ];
  return newDataSource;
}
