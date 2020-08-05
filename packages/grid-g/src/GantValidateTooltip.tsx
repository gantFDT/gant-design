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
      colDef: { tooltip, toolTipRender, field },
      value
    } = this.props;
    const { errors } = context;
    const rowErrors = get(errors, `${rowIndex}`, []);
    const errorIndex = findIndex(rowErrors, function(item) {
      return item.field == field;
    });
    const ToolTipRender = toolTipRender ? toolTipRender(value) : null;
    if (!ToolTipRender && errorIndex < 0) return null;
    const errorMsg = get(rowErrors, `${errorIndex}.message`, '');
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
