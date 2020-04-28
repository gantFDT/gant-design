import React, { Component } from 'react';
export default class GirdRenderColumn extends Component<any, any> {
  render() {
    const { value, rowIndex, render, data, valueFormatted, context } = this.props;
    const showValue =
      valueFormatted && valueFormatted !== '[object Object]' ? valueFormatted : value;
    return (
      <>
        <span className={`gant-grid-cell-content`}>
          {typeof render == 'function' ? render(showValue, data, rowIndex, this.props) : showValue}
        </span>
      </>
    );
  }
}
