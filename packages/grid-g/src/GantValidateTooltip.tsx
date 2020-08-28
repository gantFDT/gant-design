import React, { Component } from 'react';
import classnames from 'classnames';
import { get, findIndex } from 'lodash';
export default class GantValidateTooltip extends Component<any> {
  getReactContainerClasses() {
    return ['gant-cell-tooltip'];
  }
  render() {
    const {
      context,
      rowIndex,
      colDef: { tooltip, tooltipRender, field },
      value: params,
    } = this.props;
    const { data } = params;
    const errorMsg = get(data, `_rowError.${field}`, null);
    const ToolTipRender = tooltipRender ? tooltipRender(params) : null;
    if (!ToolTipRender && !errorMsg) return null;
    return (
      <div className="gant-cell-tooltip">
        <div className={classnames('gant-cell-tooltip-content', errorMsg && 'gant-cell-tooltip-error')}>
          {ToolTipRender && <div>{ToolTipRender}</div>}
          {errorMsg && <div className="gant-cell-tooltip-errorMsg">{errorMsg}</div>}
        </div>
      </div>
    );
  }
}
