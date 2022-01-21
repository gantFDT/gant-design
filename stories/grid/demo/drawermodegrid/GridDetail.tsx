import Grid from '@grid';
import { Icon } from 'antd';
import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import CombEditComponent from './CombEditComponent';
import './index.css';
import { cloneDeep, get } from 'lodash';
import {
  getEditable,
  getTransData,
  getValueRender,
  transColumnsToObj,
  getDiffProps,
} from './utils';

const GridDetail = (params: any) => {
  const {
    columns: fatherColumns,
    clickedEvent,
    setVisibleDrawer,
    editable,
    onCellEditChange,
    onCellEditingChange,
    gridManager: fatherGridManager,
  } = params;

  const {
    data: fatherData,
    api: fatherApi,
    node: fatherNode,
    rowIndex: fatherRowIndex,
  } = clickedEvent;

  const gridRef = useRef<any>(null);
  const gridManagerRef = useRef<any>(null);

  const [dataSource, setDataSource] = useState([]);

  const onReady = useCallback((params, manager) => {
    gridRef.current = params.api;
    gridManagerRef.current = manager;
  }, []);

  //列转对象
  const fields = useMemo(() => {
    return transColumnsToObj(fatherColumns);
  }, [fatherColumns]);

  //行转列
  const realColumns = useMemo(() => {
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
        },
      },
      {
        title: '值',
        fieldName: 'value',
        flex: 2,
        render: (value: string, record: any) => {
          const { fieldName } = record;
          const columnField = fields[fieldName];
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
            const columnField = fields[fieldName];
            const res = getEditable({ columnField, clickedEvent });
            return res;
          },
          // signable: true,
          // rules: [
          //   {
          //     required: true,
          //     whitespace: true,
          //     message: '描述必填',
          //   },
          // ],
        },
      },
    ];
  }, [fatherColumns, clickedEvent]);

  //值改变
  const _onCellEditingChange = (newData: any, field: string, newValue: any, oldValue: any) => {
    const { fieldName } = newData;
    const { rowkey } = fatherGridManager;

    const getRowNodeId = data => {
      if (typeof rowkey === 'string') {
        return get(data, rowkey);
      }
      return rowkey(data);
    };
    const fatherRow = fatherApi.getRowNode(getRowNodeId(fatherData));
    const newFatherData = get(fatherRow, 'data');

    const fatherNewData = { ...newFatherData, [fieldName]: newValue };
    onCellEditingChange && onCellEditingChange(fatherNewData);
    fatherGridManager.modify(fatherNewData);

    return newData;
  };

  //回填数据
  useEffect(() => {
    const { _rowData, _rowType, ...targetData } = fatherData;
    let originData = _rowData;
    if (!originData) {
      originData = targetData;
    }
    setDataSource(getTransData(fatherColumns, originData));

    if (_rowType === 'modify') {
      const diffFields = getDiffProps(_rowData, targetData);
      console.log('diffFields', diffFields);

      const modifyData = [];

      for (let arr of Object.entries(diffFields)) {
        const [key, value] = arr;
        modifyData.push({
          fieldName: key,
          value,
          label: get(fields, `${key}.title`),
        });
      }
      console.log('modifyData', modifyData);
      setTimeout(()=>{
        gridManagerRef.current.modify(modifyData);
      },20)
      
    }

  }, [fatherData, fatherColumns, fields]);

  console.log('dataSource',dataSource)

  return (
    <>
      <div style={barStyle}>
        <div>
          <Icon type="profile" /> {'行详情'}
        </div>
        <Icon type="close" onClick={() => setVisibleDrawer(false)} />
      </div>

      <Grid
        rowkey="fieldName"
        dataSource={dataSource}
        columns={realColumns}
        height={400 - 30}
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
  height: 25,
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
