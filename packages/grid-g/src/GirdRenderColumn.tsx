import React, { Component } from 'react';
export default class GirdRenderColumn extends Component<any, any> {
  render() {
    const { value, rowIndex, render, data, valueFormatted, formatValue } = this.props;
    const showValue = valueFormatted ? formatValue(this.props) : value;
    return (
      <>
        <span className={`gant-grid-cell-content`}>
          {' '}
          {typeof render == 'function' ? render(showValue, data, rowIndex) : showValue}
        </span>
      </>
    );
  }
}
