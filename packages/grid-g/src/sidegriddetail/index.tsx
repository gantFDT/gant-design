import {
  RowClickedEvent
} from '@ag-grid-community/core';
import Grid from '@grid';
import { Icon } from 'antd';
import AsyncValidator from 'async-validator';
import { find, get } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GridManager from '../gridManager';
import type { Columns } from '../interface';
import CombEditComponent from './CombEditComponent';
import {
  getDiffProps,
  getEditable,
  getOriginData,
  getTransData,
  getValueGetter,
  getValueRender,
  transColumnsToObj
} from './utils';
import {set,cloneDeep} from 'lodash'

//自定义header高度
const headerHeight = 25;
interface GridDetailProps {
  columns: Columns[], //父级column定义
  clickedEvent: RowClickedEvent | any,  //grid默认click聚合入参
  editable:boolean, //父级gird编辑状态
  onCellEditChange:(record: any, fieldName: string, newValue: any, oldValue: any) => any,  //单元格编辑联动回调
  onCellEditingChange:(record: any, fieldName: string, newValue: any, oldValue: any,params:any) => any, //单元格编辑联动回调
  gridManager: GridManager|any, //父级girdManager
  closeDrawer:()=>void,  //侧边栏关闭方法
  height:number|string,  //父级grid高度
}

//右侧边栏grid行转列详情，支持编辑和各种状态联动
const GridDetail = (props: GridDetailProps) => {
  const {
    columns: fatherColumns,
    clickedEvent: _clickedEvent,
    editable,
    onCellEditChange,
    onCellEditingChange,
    gridManager: fatherGridManager,
    closeDrawer,
    height:_height
  } = props;

  const [clickedEvent, setClickedEvent] = useState(_clickedEvent);

  const {
    data: fatherData,
    api: fatherApi,
    node: fatherNode,
    rowIndex: fatherRowIndex,
  } = clickedEvent;

  const { rowkey } = fatherGridManager;
  const [dataSource, setDataSource] = useState([]);
  const [key, setKey] = useState(1);

  const gridRef = useRef<any>(null);
  const gridManagerRef = useRef<any>(null);

  //序号
  const serialValue = fatherApi.getValue('g-index', fatherNode);

  const height = typeof _height === 'string' ? `calc(${_height} - ${headerHeight}px - 1px` : Number(_height) - headerHeight

  const onReady = useCallback((params, manager) => {
    gridRef.current = params.api;
    gridManagerRef.current = manager;
  }, []);

  //值改变
  const _onCellEditingChange = useCallback(
    (newData: any, field: string, newValue: any, oldValue: any) => {
      const {
        data: fatherData,
        api: { context },
      } = clickedEvent;
      const { fieldName } = newData;
      const getRowNodeId = data => {
        if (typeof rowkey === 'string') {
          return get(data, rowkey);
        }
        return rowkey(data);
      };
      //改变父层数据
      const fatherRow = fatherApi.getRowNode(getRowNodeId(fatherData));
      const newFatherDataAll = get(fatherRow, 'data');
      const { _rowData, _rowError, _rowType, ...newFatherData } = newFatherDataAll;
      const temp = cloneDeep(newFatherData)
      const fatherNewData = set(temp, fieldName, newValue );
      setTimeout(()=>{
        fatherGridManager.modify(fatherNewData);
      },200)
      //父级onCellEditingChange
      const record = fatherNewData;
      onCellEditingChange &&
        onCellEditingChange(record, fieldName, newValue, oldValue, { context: context });
      return newData;
    },
    [rowkey, fatherGridManager, clickedEvent],
  );

  //列转对象
  const fields = useMemo(() => {
    return transColumnsToObj(fatherColumns);
  }, [fatherColumns]);

  //行转列
  const realColumns = useMemo(() => {
    const { data: fatherData } = clickedEvent;
    const { _rowType, _rowError } = fatherData;
    return [
      {
        title: '字段',
        fieldName: 'fieldName',
        hide: true,
      },
      {
        title: '属性',
        fieldName: 'label',
        cellStyle: {
          background: 'rgba(128,128,128,0.05)',
          borderRight: '1px solid rgba(128,128,128,0.2)',
          color: _rowType === 'add' ? '#52c41a' : '#000',
        },
      },
      {
        title: '值',
        fieldName: 'value',
        flex: 2,
        //兼容父层的valueGetter
        valueGetter: function(params: any) {
          const { data } = params;
          const { fieldName } = data;
          const columnField = get(fields,fieldName);
          const value = get(data,'value');
          const valueGetter = getValueGetter({
            columnField,
            fieldName,
            clickedEvent,
            cellValue: value,
          });
          return valueGetter;
        },
        //兼容父层的valueFormatter和render
        render: (value: string, record: any) => {
          const { fieldName } = record;
          const columnField = get(fields,fieldName);
          const valueRender = getValueRender({
            columnField,
            fieldName,
            clickedEvent,
            record,
            cellValue: value,
          });
          return valueRender;
        },
        editConfig: {
          component: params => {
            return <CombEditComponent {...params} fields={fields} />;
          },
          editable: function(record, params) {
            const { fieldName } = record;
            const columnField = get(fields,fieldName);
            const res = getEditable({ columnField, clickedEvent });
            return res;
          },
          signable: true,
          rules: {
            //统一校验
            asyncValidator: async (rules: any, value: any, cb: any, data: any) => {
              const { fieldName, _rowError } = data;
              const fieldsRules = {};
              Object.keys(fields).map(key => {
                const rules = get(fields, `${key}.editConfig.rules`);
                if (rules) {
                  fieldsRules[key] = rules;
                }
              });
              const validator = new AsyncValidator(fieldsRules);
              validator.validate(
                { ...fatherData, [fieldName]: value },
                {},
                (errors: any, fields: any) => {
                  if (errors) {
                    errors.forEach(error => {
                      if (error.field === fieldName) {
                        cb(error.message);
                      }
                    });
                  } else {
                    cb();
                  }
                },
              );
            },
          },
        },
      },
    ];
  }, [fatherColumns, clickedEvent, fields]);

  //监听clickedEvent
  useEffect(() => {
    setClickedEvent(_clickedEvent);
  }, [_clickedEvent]);

  //回显数据
  useEffect(() => {
    const { data: fatherData } = clickedEvent;
    const { _rowData, _rowType, _rowError, ...targetData } = fatherData;
    //获取原数据
    let originData = getOriginData(fatherData);
    //行数据转列数据
    const originDataSource = getTransData(fatherColumns, originData);
    const targetDataSource = getTransData(fatherColumns, targetData);
    
    //设置源数据
    setDataSource(originDataSource);

    //类型为修改
    if (_rowType === 'modify') {
      const diffFields = getDiffProps(_rowData, targetData);
      const modifyData = [];
      for (let arr of Object.entries(diffFields)) {
        const [key, value] = arr;
        modifyData.push({
          fieldName: key,
          value,
          label: get(fields, `${key}.title`),
          _rowError,
        });
      }
      //如果有校验不通过
      if (_rowError) {
        for (let item of Object.entries(_rowError)) {
          const [fieldName, value] = item;
          originDataSource.forEach(item => {
            if (item['fieldName'] === fieldName) {
              item._rowError = { value };
            }
          });
          setDataSource(originDataSource);
        }
      }
      setTimeout(() => {
        gridManagerRef.current.modify(modifyData);
      }, 20);
    }
    //类型为新增
    if (_rowType === 'add') {
      setDataSource(targetDataSource);
    }
    //类型为标记删除
    if (_rowType === 'remove_tag') {
      setDataSource(targetDataSource);
      setTimeout(() => {
        gridManagerRef.current.tagRemove(Object.keys(fields));
      }, 20);
    }
  }, [clickedEvent, fatherColumns, fields]);

  //标记删除
  useEffect(() => {
    fatherGridManager.afterTagRemove = function({ removeRecords, removeKeys, removeNodes }) {
      const { data: fatherData } = clickedEvent;
      const hasTagRemove = find(removeNodes, o => get(o, `data.${rowkey}`) === fatherData[rowkey]);
      if (hasTagRemove) {
        const newEvent = {
          ...clickedEvent,
          data: { ...hasTagRemove.data, _rowType: 'remove_tag' },
        };
        setClickedEvent(newEvent);
      }
    };
  }, [fatherGridManager, rowkey, clickedEvent]);

  //保存
  useEffect(() => {
    fatherGridManager.afterSave = function({ diff }) {
      const { data: fatherData } = clickedEvent;
      const { remove } = diff;
      const hasTagRemove = find(remove, o => get(o, `${rowkey}`) === fatherData[rowkey]);
      if (hasTagRemove) {
        setDataSource([]);
        // clickedEvent.api.refreshCells({ force: true,columns:['g-index'] });
      }
      gridManagerRef.current.save();
    };
  }, [clickedEvent, fatherGridManager, rowkey]);

  //undo
  useEffect(() => {
    fatherGridManager.afterUndo = function(hisStack) {
      const { data: fatherData } = clickedEvent;
      const {
        type,
        records: [record],
      } = hisStack;
      if (record[rowkey] !== fatherData[rowkey]) {
        return;
      }
      if (type === 'modify' || type === 'remove_tag') {
        setClickedEvent({
          ...clickedEvent,
          data: record,
        });
      }
    };
  }, [rowkey, clickedEvent]);

  //redo
  useEffect(() => {
    fatherGridManager.afterRedo = function(hisStack) {
      const { data: fatherData } = clickedEvent;
      const {
        type,
        records: [record],
      } = hisStack;
      if (record[rowkey] !== fatherData[rowkey]) {
        return;
      }
      if (type === 'modify' || type === 'remove_tag') {
        setClickedEvent({
          ...clickedEvent,
          data: record,
        });
      }
    };
  }, [rowkey, clickedEvent]);

  //cancel
  useEffect(() => {
    fatherGridManager.afterCancel = function(dataSource) {
      const { data: fatherData } = clickedEvent;
      let originData = getOriginData(fatherData);
      setClickedEvent({
        ...clickedEvent,
        data: originData,
      });
    };
  }, [clickedEvent]);

  return (
    <>
      <div style={barStyle}>
        <div>
          <Icon type="profile" /> {'行详情'}
          {/* ({serialValue}) */}
        </div>
        <Icon type="close" onClick={() => closeDrawer()} />
      </div>

      <Grid
        key={key}
        rowkey="fieldName"
        dataSource={dataSource}
        columns={realColumns}
        height={height}
        enableCellTextSelection={false}
        enableRangeSelection
        onReady={onReady}
        // headerHeight={0}
        defaultColDef={{
          flex: 1,
          floatingFilter: true,
          filter: 'agMultiColumnFilter',
        }}
        onCellEditingChange={_onCellEditingChange}
        popupParent={document.querySelector('body')}
        editable={editable}
        className={'grid-side-detail-panel'}
      />
    </>
  );
};

export default GridDetail;

const barStyle = {
  padding: '0 10px',
  height: headerHeight,
  display: 'flex',
  fontSize: 12,
  fontWeight: '600',
  color:
    'var(--ag-header-foreground-color, var(--ag-secondary-foreground-color, rgba(0, 0, 0, 0.54)))',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: `var(--ag-header-background-color, #f5f7f7)`,
  borderBottom: `1px solid var(--ag-border-color, #bdc3c7)`,
};
