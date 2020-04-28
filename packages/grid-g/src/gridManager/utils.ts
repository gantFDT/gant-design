import { get, isEmpty, isEqual, findIndex } from 'lodash';
import { DataActions } from '../interface';
export function getModifyData(records, getRowItemData) {
  const hisRecords: any[] = [],
    newRecords: any[] = [];
  records.map(item => {
    const { data } = getRowItemData(item);
    if (isEqualObj(data, item)) return;
    let { _rowData, _rowType = null, ...oldData } = data;
    let { _rowData: nextRowData, _rowType: nextRowType, ...newData } = item;
    if (nextRowType === DataActions.remove || nextRowType === DataActions.removeTag)
      return console.warn('Cannot modify deleted data');
    _rowData = isEmpty(_rowData) ? oldData : _rowData;
    const hasChange = !isEqualObj(_rowData, newData);
    console.log('hasChange', _rowData, newData);
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
  if (!value) return true;
  return isEmpty(value);
};
export const isEqualObj = (obj, obj2) => {
  let _EqualObj = true;
  const newObj = { ...obj, ...obj2 };
  for (var i in newObj) {
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
        value2 = typeof value2 == 'object' ? value2 : value2 + '';
        value1 = typeof value1 == 'object' ? value1 : value1 + '';
        _EqualObj = isEqual(value2, value1);
      }
    }
    if (!_EqualObj) return _EqualObj;
  }
  return true;
};

export function replaceRecord() {}
