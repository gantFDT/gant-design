import React, { Component } from 'react';
import { get, findIndex } from 'lodash';
export default class GantValidateTooltip extends Component<any> {
  getReactContainerClasses() {
    return ['gant-cell-tooltip'];
  }
  render() {
    const {
      context,
      rowIndex,
      colDef: { field },
    } = this.props;
    const { errors } = context;
    const rowErrors = get(errors, `${rowIndex}`, []);
    const errorIndex = findIndex(rowErrors, function(item) {
      return item.field == field;
    });
    if (errorIndex < 0) return null;
    const errorMsg = get(rowErrors, `${errorIndex}.message`);
    return (
      <div className="gant-cell-tooltip">
        <div className="gant-cell-tooltip-content">{errorMsg}</div>
      </div>
    );
  }
}
