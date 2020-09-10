import React, { Component } from 'react';
import classnames from 'classnames';
import { get, isEmpty } from 'lodash';
const isEmptyObj = value => {
  if (typeof value === 'number') return false;
  if (typeof value === 'object') return isEmpty(value);
  return !value;
};
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
      column,
    } = this.props;
    const { data } = params;
    let errorMsg = get(data, `_rowError.${field}`, null);
    errorMsg = isEmptyObj(get(data, `${field}`, null)) ? null : errorMsg;
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
