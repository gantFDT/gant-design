export default ` 
import React, { useState } from 'react';
import { Grid } from 'gantd';
import DetailCellRenderer from './DetailCellRender';

const columns = [
  {
    title: 'Name',
    fieldName: 'name',
    width: 200,
    cellRenderer: 'agGroupCellRenderer',
  },
  {
    title: 'Account',
    fieldName: 'account',
    width: 100,
  },
  {
    title: 'Calls',
    fieldName: 'calls',
    width: 200,
  },
];

export default () => {
  const [rowData, setRowData] = useState();

  const onFirstDataRendered = (params) => {
    params.api.forEachNode(function (node) {
      node.setExpanded(node.id === '1');
    });
  };

  const onGridReady = (params) => {
    fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        return setRowData(data);
      });
  };

  return (
    <>
      <Grid
        rowkey="account"
        serialNumber
        columns={columns}
        dataSource={rowData}
        onReady={onGridReady}
        defaultColDef={{
          flex: 1,
        }}
        detailRowHeight={200}
        frameworkComponents={{ myDetailCellRenderer: DetailCellRenderer }}
        onFirstDataRendered={onFirstDataRendered}
        masterDetail={true}
        detailCellRenderer={'myDetailCellRenderer'}
      />
    </>
  );
};
 
 `