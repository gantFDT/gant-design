import {
  RowDataTransaction,
  GridApi,
  RowNode,
  ColDef,
  ColGroupDef,
  ColumnApi,
} from 'ag-grid-community';
import Schema, { Rules } from 'async-validator';
import {
  get,
  isEmpty,
  findIndex,
  cloneDeep,
  set,
  uniqBy,
  groupBy,
  assignInWith,
  isEqual,
  merge,
} from 'lodash';
import {
  getModifyData,
  removeTagData,
  isEqualObj,
  canQuickCreate,
  getRowsToUpdate,
  onSetcutData,
  getAllChildrenNode,
  sortAndMergeColumns,
  getAllCoumns,
  replaceRowData,
} from './utils';
import { bindAll } from 'lodash-decorators';
import { generateUuid } from '@util';
import { flattenTreeData } from '../utils';
import { modifyDecorator, hisDecorator } from './decorator';
import { AgGridConfig, OperationAction, Diff, BatchUpdateDataSourceParams } from './interface';
import { DataActions, RowKey } from '../interface';
@bindAll()
export default class GridManage {
  public rowkey: RowKey<any> | string;
  public agGridApi: GridApi;
  public agGridColumnApi: ColumnApi;
  columnsDefs: any[];
  public gridKey?: string;
  public agGridConfig: AgGridConfig;
  public historyStack: any[] = [];
  private redoStack: OperationAction[] = [];
  private dataAsyncFun: any = null;
  private dataAsyncStack: any[] = [];
  public cutRows: any[];
  public afterTagRemove: Function;
  public afterSave: Function;
  public afterUndo: Function;
  public afterRedo: Function;
  public afterCancel: Function;
  setingLoading: boolean = false;
  clearloding: boolean;
  get loading() {
    return this.setingLoading;
  }
  set loading(value) {
    this.setingLoading = value;
    if (value === false && this.dataAsyncStack.length > 0) {
      this.outAsyncFunStack();
    }
  }
  public validateFields: Rules;
  private changeStatus: boolean = false;
  get isChanged() {
    const { remove, modify, add } = this.diff;
    const all = [...remove, ...modify, ...add];
    return all.length > 0;
  }
  get diff() {
    const allDiff = this.changeDiff();
    const { remove, modify, add } = allDiff;
    return { remove: [...remove], modify, add };
  }
  private async outAsyncFunStack() {
    if (this.loading || this.dataAsyncStack.length <= 0) return;
    while (!this.loading && this.dataAsyncStack.length > 0) {
      const asyncFun = this.dataAsyncStack.shift();
      if (typeof asyncFun === 'function') await asyncFun();
    }
  }
  public async onDataAsyncEnd(func) {
    if (typeof func !== 'function') return;
    if (this.loading === false) return func();
    this.dataAsyncStack.push(func);
    return null;
  }
  private watchHistory() {
    if (this.isChanged === this.changeStatus) return;
    this.agGridConfig.editChangeCallback && this.agGridConfig.editChangeCallback(this.isChanged);
    this.changeStatus = this.isChanged;
  }
  private getRowItemData = (itemData: any, oldData?: any) => {
    const { getRowNodeId } = this.agGridConfig;
    const nodeId = typeof itemData === 'object' ? getRowNodeId(itemData) : itemData;
    let rowNode = this.agGridApi.getRowNode(nodeId);
    return isEmpty(oldData) ? rowNode : { ...rowNode, data: { ...oldData } };
  };
  private batchUpdateGrid(
    transaction: RowDataTransaction,
    callback?: (transaction: RowDataTransaction) => void,
  ) {
    this.agGridApi.applyTransactionAsync(transaction, callback);
  }
  appendChild(keys, add) {
    const { isCompute, treeDataChildrenName, getRowNodeId } = this.agGridConfig;
    const addData = isCompute ? flattenTreeData(add, getRowNodeId, treeDataChildrenName) : add;
    this.batchUpdateGrid({ add: addData });
  }
  async validate(data?: any[]) {
    const { getRowNodeId } = this.agGridConfig;
    const { add, modify } = this.diff;
    let initsource = isEmpty(data) ? [...add, ...modify] : data;
    let source = cloneDeep(initsource);
    const fields: any = {};
    const validateFields: Rules = cloneDeep(this.validateFields);
    source = source.map((item, index) => {
      let newItem = cloneDeep(item);
      fields[index] = {
        type: 'object',
        fields: validateFields,
      };
      Object.keys(validateFields).map(validateField => {
        const field = validateField.replace(/\-/g, '.');
        newItem = set(newItem, validateField, get(newItem, field));
      });
      return newItem;
    });

    let descriptor: any = {
      type: 'object',
      source: {
        type: 'array',
        fields,
      },
    };
    let schema = new Schema(descriptor);
    try {
      await schema.validate({ source });
      this.errorSign({}, initsource);
      return null;
    } catch (err) {
      const { errors } = err;
      const validateErros: any = {};
      let nodeIds: string[] = [];
      let nodeFields: string[] = [];
      errors.map(itemError => {
        let [sourceName, index, field] = itemError.field.split('.');
        field = field.replace(/\-/g, '.');
        const nodeId = getRowNodeId(get(source, `[${index}]`, {}));
        const rowNode = this.agGridApi.getRowNode(nodeId);
        const message = itemError.message;
        if (rowNode) {
          this.getNodeExtendsParent(rowNode);
          const { rowIndex } = rowNode;
          if (Reflect.has(validateErros, rowIndex)) {
            validateErros[rowIndex].push({ field, message });
          } else {
            validateErros[rowIndex] = [{ field, message }];
          }
          nodeIds = [...nodeIds, nodeId];
          nodeFields = [...nodeFields, field];
        }
      });
      if (isEmpty(validateErros)) return;
      this.errorSign(validateErros, initsource);
      return validateErros;
    }
  }
  errorSign(validateErros: any, newData: any[]) {
    let update: any[] = [];
    const indexArr: number[] = [];
    update = newData.map(itemData => {
      const nodeId = this.agGridConfig.getRowNodeId(itemData);
      const rowNode = this.agGridApi.getRowNode(nodeId);
      const rowIndex = get(rowNode, 'rowIndex', -1);
      const errorsArr = validateErros[rowIndex];
      const mergeData = { ...get(rowNode, 'data', {}), ...itemData };
      const { _rowError: merge_rowError, ...newItemData } = mergeData;
      if (errorsArr) {
        const _rowError: any = {};
        errorsArr.map(itemError => {
          set(_rowError, itemError.field, itemError.message);
        });
        rowNode.setData({ ...newItemData, _rowError });
      } else {
        if (merge_rowError) rowNode.setData({ ...newItemData });
      }
    });
  }

  private getNodeExtendsParent(rowNode: RowNode, first = true) {
    if (rowNode.level > 0) {
      this.getNodeExtendsParent(rowNode.parent, false);
      if (!rowNode.parent.expanded) rowNode.parent.setExpanded(true);
    } else if (rowNode.level == 0 && !first) {
      if (!rowNode.expanded) rowNode.setExpanded(true);
    }
  }
  cancelCut() {
    try {
      const update = onSetcutData(this.cutRows, true);
      this.agGridApi.applyTransactionAsync({ update });
      this.cutRows = [];
    } catch (error) {
      console.error('cancelCut---->', error);
    }
  }
  cut(rowsNodes: RowNode[]) {
    try {
      const oldUpdate = onSetcutData(this.cutRows, true);
      const newUpdate = onSetcutData(rowsNodes);
      if (!isEmpty(this.cutRows)) onSetcutData(rowsNodes);
      this.agGridApi.applyTransactionAsync({ update: [...oldUpdate, ...newUpdate] });
      this.cutRows = rowsNodes;
    } catch (error) {
      console.error(error);
    }
  }
  paste(node, up = true, isChild = false) {
    try {
      const { getDataPath, createConfig, treeData, getRowNodeId } = this.agGridConfig;

      let removeData: any[] = [],
        addData: any[] = [];
      if (!treeData) {
        removeData = this.cutRows.map(itemNode => {
          const { _rowCut, ...data } = get(itemNode, 'data', {});
          return data;
        });
        addData = removeData;
      } else {
        if (!canQuickCreate(createConfig)) return console.warn('createConfig is error');
        let { defaultParentPath = [] } = createConfig;
        defaultParentPath = Array.isArray(defaultParentPath) ? defaultParentPath : [];
        let parentPath = !node ? defaultParentPath : [];
        if (node) {
          const brotherPath = getDataPath(get(node, 'data', []));
          parentPath = isChild ? brotherPath : brotherPath.slice(0, brotherPath.length - 1);
        }
        const { newRowData, oldRowData } = getRowsToUpdate(
          this.cutRows,
          parentPath,
          createConfig,
          this.agGridConfig,
        );
        removeData = oldRowData;
        addData = newRowData;
      }

      this.agGridApi.applyTransactionAsync({ remove: removeData }, params => {
        const rowData = this.getRowData();
        const newDataSource = replaceRowData({
          rowData,
          targetData: node.data,
          newData: addData,
          getRowNodeId,
          up,
        });
        this.agGridApi.setRowData(newDataSource);
        this.cutRows = [];
        this.agGridConfig.onRowsPasteEnd && this.agGridConfig.onRowsPasteEnd(newDataSource);
      });
    } catch (error) {
      console.error(error);
    }
  }
  @hisDecorator()
  reset(agGridConfig) {
    this.agGridConfig = { ...this.agGridConfig, ...agGridConfig };
    this.historyStack = [];
    this.redoStack = [];
    this.cutRows = [];
  }
  dataSourceChanged(dataSource: any[] = []) {
    if (!Array.isArray(dataSource) || !this.agGridApi) return;
    const gridDataSource = [];
    this.agGridApi.forEachNode(node => {
      if (node.data) gridDataSource.push(node.data);
    });
    const cloneDataSource = this.agGridConfig.cloneDataSource;
    if (isEqual(dataSource, gridDataSource) || isEqual(dataSource, this.agGridConfig.dataSource))
      return this.agGridApi.setRowData(cloneDataSource ? cloneDeep(dataSource) : dataSource);
    this.reset({
      dataSource: dataSource,
    });
    this.agGridApi.setRowData([]);

    this.agGridApi.setRowData(cloneDataSource ? cloneDeep(dataSource) : dataSource);
  }
  getRowData() {
    var rowData = [];
    if (!this.agGridApi) return [];
    this.agGridApi.forEachLeafNode(function(node, index) {
      rowData.push({ ...node.data, dataNumber: index });
    } as any);
    return rowData;
  }
  @modifyDecorator()
  @hisDecorator()
  public async modify(records: any | any[], oldRecords: any | any[] = []) {
    if (isEmpty(records) && typeof records !== 'object') return;
    records = Array.isArray(records) ? records : [records];
    if (records.length <= 0) return;

    const { hisRecords, newRecords } = getModifyData(
      records,
      this.getRowItemData,
      oldRecords,
      this.agGridConfig.getRowNodeId,
    );
    if (newRecords.length <= 0) return;
    const updateRowData = [];
    newRecords.map(data => {
      const nodeId = this.agGridConfig.getRowNodeId(data);
      const node = this.agGridApi.getRowNode(nodeId);
      if (node && node.data && data) return updateRowData.push(data);
    });
    await new Promise(resolve => {
      this.batchUpdateGrid({ update: updateRowData }, (params: any) => {
        resolve(params);
      });
    });

    this.historyStack.push({
      type: DataActions.modify,
      records: hisRecords,
    });
    if (this.agGridConfig?.multiLineVerify) {
      const { diff } = this;
      const { modify, add } = diff;
      const data = [...modify, ...add];
      this.validate(data);
      return;
    }
    await this.validate(updateRowData);
  }

  // 创建;
  @hisDecorator()
  public create(records: any, targetId?: boolean | string | number, isSub: boolean = true) {
    const { getRowNodeId } = this.agGridConfig;
    let addRecords = Array.isArray(records) ? records : [records];
    if (addRecords.length <= 0) return;
    let rowData = this.getRowData();
    addRecords = addRecords.map(item => ({ ...item, _rowType: DataActions.add }));
    this.agGridColumnApi.applyColumnState({});
    if ((typeof targetId !== 'number' && !targetId) || typeof targetId === 'boolean') {
      const isFirst: boolean = typeof targetId === 'boolean' && targetId;
      this.batchUpdateGrid(
        {
          add: addRecords,
          addIndex: isFirst ? 0 : undefined,
        },
        () => {
          this.validate(addRecords);
          this.historyStack.push({
            type: DataActions.add,
            records: addRecords,
          });
        },
      );
      return;
    }
    addRecords = addRecords;
    let targetIndex = findIndex(rowData, data => getRowNodeId(data) == targetId);
    targetIndex = typeof targetIndex == 'number' && targetIndex < 0 ? targetId : targetIndex;
    if (Array.isArray(targetId)) targetIndex = 0;
    this.batchUpdateGrid(
      {
        add: addRecords,
        addIndex: targetIndex,
      },
      () => {
        this.validate(addRecords);
        this.historyStack.push({
          type: DataActions.add,
          records: addRecords,
        });
      },
    );
  }
  private quickCreateNode(
    isChild: boolean = false,
    targetId: string | number,
    record: number | object | any[] = 1,
  ) {
    const { createConfig, treeData, getDataPath } = this.agGridConfig;
    targetId = targetId + '';
    const rowNode = this.agGridApi.getRowNode(targetId);
    const { data: nodeData } = rowNode;
    const nodePath = getDataPath(nodeData);
    const parentPath = isChild ? [...nodePath] : [...nodePath.slice(0, nodePath.length - 1)];
    if (typeof record == 'number') {
      let len = record > 1 ? record : 1;
      const records: any[] = [];
      for (let index = 0; index < len; index++) {
        let data: any = {};
        const id = generateUuid() + '';
        data[createConfig.id] = id;
        if (getDataPath && treeData) {
          data[createConfig.path] = createConfig.toPath([...parentPath, id]);
        }
        records.push(data);
      }
      return this.create(records, targetId);
    }
    if (typeof record === 'object' && !Array.isArray(record)) {
      let data: any = {};
      const id = generateUuid() + '';
      data[createConfig.id] = id;
      if (getDataPath && treeData) {
        data[createConfig.path] = createConfig.toPath([...parentPath, id]);
        data = { ...data, ...record };
      }
      return this.create(data, targetId);
    }
    if (Array.isArray(record)) {
      const records = record.map(item => {
        const id = generateUuid() + '';
        let data = { ...item, [createConfig.id]: id };
        if (getDataPath && treeData) {
          data[createConfig.path] = createConfig.toPath([...parentPath, id]);
        }
        return data;
      });
      return this.create(records, targetId);
    }
  }
  // 创建平行节点
  public createNode(targetId: string | number, record: number | object | any[] = 1) {
    const { createConfig, getRowNodeId, treeData, getDataPath } = this.agGridConfig;
    if (!canQuickCreate(createConfig)) return console.warn('createConfig is error');
    if (typeof targetId !== 'number' && !targetId) return console.warn('nodeId is null');
    if (typeof targetId !== 'string' && typeof targetId !== 'number')
      return console.warn('nodeId format error');

    this.quickCreateNode(false, targetId, record);
  }
  public createChildNode(targetId: string | number, record: number | object | any[] = 1) {
    const { createConfig, getRowNodeId, treeData, getDataPath } = this.agGridConfig;
    if (!canQuickCreate(createConfig)) return console.warn('createConfig is error');
    if (typeof targetId !== 'number' && !targetId) return console.warn('parentNodeId is null');
    if (typeof targetId !== 'string' && typeof targetId !== 'number')
      return console.warn('parentNodeId format error');
    this.quickCreateNode(true, targetId, record);
  }
  //移除;
  @hisDecorator()
  remove(targetid, deleteChildren = false) {
    if (typeof targetid !== 'number' && isEmpty(targetid)) return;
    const { getRowNodeId } = this.agGridConfig;
    let targetArray = Array.isArray(targetid) ? targetid : [targetid];
    if (targetArray.length <= 0) return;
    const recordsIndex: number[] = [];
    const records: any[] = [];
    const rowData = this.getRowData();
    const removeNodes = getAllChildrenNode(targetArray, this.agGridApi, deleteChildren);
    removeNodes.map(itemNode => {
      const { data, childIndex } = itemNode;
      if (data) {
        const rowIndex = findIndex(
          rowData,
          itemData => getRowNodeId(itemData) === getRowNodeId(data),
        );
        recordsIndex.unshift(rowIndex);
        records.unshift(data);
      }
    });
    this.historyStack.push({
      type: DataActions.remove,
      recordsIndex: recordsIndex,
      records: records,
    });
    this.batchUpdateGrid({
      remove: records,
    });
    return records;
  }
  //移除标记;
  @hisDecorator()
  tagRemove(targetKeys: string | number | string[] | number[], deleteChildren = false) {
    if (typeof targetKeys !== 'number' && isEmpty(targetKeys)) return;
    const { getRowNodeId } = this.agGridConfig;
    let rowData = this.getRowData();
    if (!Array.isArray(targetKeys) && typeof targetKeys === 'object') return;
    const targetArray = Array.isArray(targetKeys) ? targetKeys : [targetKeys];
    if (targetArray.length <= 0) return;
    const removeNodes = getAllChildrenNode(targetArray, this.agGridApi, deleteChildren);
    const { hisRecords, newRecords, removeIndexs, removeRecords: remove } = removeTagData(
      removeNodes,
      rowData,
      getRowNodeId,
    );
    if (newRecords.length == 0 && remove.length == 0) return;
    this.batchUpdateGrid({ update: newRecords, remove });
    this.historyStack.push({
      type: DataActions.removeTag,
      records: hisRecords,
      recordsIndex: removeIndexs,
    });
    this.afterTagRemove &&
      this.afterTagRemove({ removeRecords: remove, removeKeys: targetKeys, removeNodes });
  }

  private toggleUndoRedo(hisStack: OperationAction, undo: boolean = true) {
    const { getRowNodeId } = this.agGridConfig;
    let rowData = this.getRowData();
    if (rowData.length == 0) this.agGridApi.setRowData([]);
    let { records, recordsIndex, type } = hisStack;
    if (type === DataActions.remove) {
      recordsIndex.map((removeIndex, index) => {
        rowData = [...rowData.slice(0, removeIndex), records[index], ...rowData.slice(removeIndex)];
      });
      this.agGridApi.setRowData(rowData);
      recordsIndex = [];
      type = DataActions.add;
    } else if (type === DataActions.add) {
      recordsIndex = [];
      records.map(itemRecord => {
        const removeIndex = findIndex(
          rowData,
          data => getRowNodeId(data) === getRowNodeId(itemRecord),
        );
        rowData = [...rowData.slice(0, removeIndex), ...rowData.slice(removeIndex + 1)];
        recordsIndex.unshift(removeIndex);
      });
      records = records.reverse();
      type = DataActions.remove;
      this.batchUpdateGrid({
        remove: records,
      });
    } else if (type === DataActions.modify) {
      const hisRecords: any[] = [];
      const newRecords = records.map(item => {
        const rowNode = this.agGridApi.getRowNode(getRowNodeId(item));
        const { _nextRowData, ...data } = item;
        hisRecords.push({ ...get(rowNode, 'data', {}) });
        return item;
      });
      records = hisRecords;
      this.batchUpdateGrid({ update: newRecords });
    } else {
      const hisRecords: any[] = [];
      recordsIndex.map((removeIndex, index) => {
        const item = records[index];
        if (item._rowType === DataActions.add) {
          if (undo) {
            rowData = [...rowData.slice(0, removeIndex), item, ...rowData.slice(removeIndex)];
          } else {
            rowData = [...rowData.slice(0, removeIndex), ...rowData.slice(removeIndex + 1)];
          }
          hisRecords.push(item);
        } else {
          rowData = [...rowData.slice(0, removeIndex), item, ...rowData.slice(removeIndex + 1)];
          const rowNode = this.agGridApi.getRowNode(getRowNodeId(item));
          hisRecords.push({ ...get(rowNode, 'data', {}) });
        }
      });
      records = hisRecords.reverse();
      recordsIndex = recordsIndex.reverse();
      this.agGridApi.setRowData(rowData);
    }
    return { type, records, recordsIndex };
  }
  //撤销；
  @hisDecorator()
  undo() {
    let hisStack = this.historyStack.pop();
    if (isEmpty(hisStack)) return;
    const newhisStack = this.toggleUndoRedo(hisStack, true);
    this.redoStack.push(newhisStack);
    this.afterUndo && this.afterUndo(hisStack);
  }
  @hisDecorator()
  redo() {
    let hisStack = this.redoStack.pop();
    if (isEmpty(hisStack)) return;
    const newhisStack = this.toggleUndoRedo(hisStack, false);
    this.historyStack.push(newhisStack);
    this.afterRedo && this.afterRedo(hisStack);
  }

  cancel() {
    const { dataSource, cloneDataSource } = this.agGridConfig;
    this.agGridApi.setRowData(cloneDataSource ? cloneDeep(dataSource) : dataSource);
    this.reset(this.agGridConfig);
    this.afterCancel && this.afterCancel(this.agGridConfig.dataSource);
  }
  async save(cb?) {
    let cansave = null;
    if (cb) {
      cansave = await cb();
      this.afterSave && this.afterSave({ diff: this.diff });
      if (!cansave) return;
    }
    const data = Array.isArray(cansave) ? cansave : this.getPureData();
    this.agGridApi.setRowData(data);
    this.reset({ dataSource: data });
  }
  //
  private changeDiff() {
    const { getRowNodeId } = this.agGridConfig;
    const diffRecords: any = [];
    const diffArray: any[] = [];
    const defaultDiff: Diff = {
      add: [],
      modify: [],
      remove: [],
    };
    if (!this.agGridApi) return defaultDiff;
    const nowHistoryStack = cloneDeep(this.historyStack);
    nowHistoryStack.reverse().map(hisItem => {
      const { type, recordsIndex, records } = hisItem;
      records.map((recordItem, recordItemIndex) => {
        const isRecorded = diffRecords.indexOf(getRowNodeId(recordItem)) >= 0;
        if (isRecorded) return;
        const rowNode = this.agGridApi.getRowNode(getRowNodeId(recordItem));
        const _nextRowData = get(rowNode, 'data', recordItem);
        let { _rowData, _rowType, _rowError, undefined, ...data } = _nextRowData;
        _rowData = isEmpty(_rowData) ? data : _rowData;
        diffRecords.push(getRowNodeId(_nextRowData));
        switch (type) {
          case DataActions.add:
            return diffArray.push({ ...data, actionType: DataActions.add });
          case DataActions.modify:
            if (!isEqualObj(_rowData, data) && _rowType !== DataActions.add) {
              diffArray.push({ ...data, actionType: DataActions.modify });
            } else if (_rowType === DataActions.add) {
              diffArray.push({ ...data, actionType: DataActions.add });
            }
            return;
          default:
            if (_rowType !== DataActions.add) {
              diffArray.push({ ..._rowData, actionType: DataActions.remove });
            }
            return;
        }
      });
    });

    this.agGridApi.forEachNode(function(node, index) {
      const diffIndex = findIndex(diffArray, item => {
        return getRowNodeId(item) === getRowNodeId(get(node, 'data', {}));
      });
      if (diffIndex >= 0) {
        diffArray[diffIndex] = { ...diffArray[diffIndex], dataNumber: index };
      }
    } as any);
    const diff: Diff = groupBy(diffArray, 'actionType');
    return isEmpty(diff) ? defaultDiff : { ...defaultDiff, ...diff };
  }
  getPureData() {
    const data: any[] = [];
    if (!this.agGridApi) return data;
    this.agGridApi.forEachNode(function(node, index) {
      let cloneData = cloneDeep(get(node, 'data', {}));
      if (!isEmpty(cloneData)) {
        const { _rowType, _rowData, _rowCut, _rowError, ...itemData } = cloneData;
        if (_rowType !== DataActions.removeTag) data.push({ ...itemData, dataNumber: index });
      }
    } as any);
    return data;
  }
  //批量更新数据 返回更新后的gird数据
  batchUpdateDataSource(
    params: BatchUpdateDataSourceParams,
    keys: string | string[] = [],
    isMerge = false,
    notMergeKeys: string | string[] = [],
  ) {
    const { getRowNodeId } = this.agGridConfig;
    const dataSource: any = [];
    const { add, modify, remove } = params;
    const update = uniqBy([...add, ...modify], 'dataNumber');
    const removeKeys = remove.map(item => getRowNodeId(item));
    const removeNodes = getAllChildrenNode(removeKeys, this.agGridApi, false);
    const assignKeys = typeof keys === 'string' ? [keys] : keys;
    const notAssignKeys = Array.isArray(notMergeKeys) ? notMergeKeys : [notMergeKeys];
    this.agGridApi.forEachNode(function(node, index) {
      const removeIndex = findIndex(
        removeNodes,
        item => getRowNodeId(get(node, 'data')) === getRowNodeId(get(item, 'data')),
      );
      if (removeIndex >= 0) return;
      const updateIndex = findIndex(update, item => item.dataNumber === index);
      const { _rowType, _rowData, _rowCut, _rowError, treeDataPath, ...data } = get(
        node,
        'data',
        {},
      );
      if (updateIndex >= 0) {
        const mergeData = {};
        assignKeys.map(item => {
          mergeData[item] = data[item];
        });
        notAssignKeys.map(key => {
          mergeData[key] = get(update, `[${updateIndex}].${key}`);
        });
        const updateItem = isMerge
          ? merge(data, update[updateIndex], mergeData)
          : { ...update[updateIndex], ...mergeData };
        return dataSource.push(updateItem);
      }
      dataSource.push(data);
    } as any);
    return dataSource;
  }
  // LocalStorage columns
  getLocalStorageColumns(columns: (ColDef | ColGroupDef)[], gridKey) {
    const localColumnsJson = localStorage.getItem(`gantd-grid-column-${gridKey}`);
    this.gridKey = gridKey;
    this.columnsDefs = columns;
    if (!localColumnsJson || !gridKey) return columns;
    try {
      const localColumns = JSON.parse(localColumnsJson);
      return sortAndMergeColumns(columns, localColumns);
    } catch (err) {
      console.error(err);
      return columns;
    }
  }
  setLocalStorageColumnsState() {
    if (!this.gridKey || !this.agGridColumnApi || this.clearloding) return;
    try {
      const columns = this.agGridColumnApi.getColumnState();
      const localColumnsJson = JSON.stringify(columns);
      localStorage.setItem(`gantd-grid-column-${this.gridKey}`, localColumnsJson);
    } catch (error) {}
  }
  clearLocalStorageColumns() {
    this.clearloding = true;
    localStorage.removeItem(`gantd-grid-column-${this.gridKey}`);
    this.agGridApi.setColumnDefs(this.columnsDefs);
    this.agGridColumnApi.resetColumnState();
    setTimeout(() => {
      this.clearloding = false;
    }, 10);
  }
}
