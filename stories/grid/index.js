import { setGridConfig } from '@grid';
import React from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import children from './demo';

setGridConfig({ gantDateComponent: true });

const config = {
  useage: (
    <div>
      <div>依赖于ag-grid的高性能表格</div>
      <div style={{ fontWeight: 'bold' }}>
        ag-grid-enterprise需商业授权，如需使用ag-grid-enterprise功能，请自行获得LicenseKey
      </div>
      <div>
        <a href="https://www.ag-grid.com/" target="_blank">
          Ag-Grid官网
        </a>
      </div>
      <div>
        <a href="https://github.com/ag-grid/ag-grid/blob/master/LICENSE.txt" target="_blank">
          LICENSE
        </a>
      </div>
    </div>
  ),
  children,
};

export default () => <CodeDecorator config={config} />;
