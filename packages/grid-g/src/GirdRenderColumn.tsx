import React, { Component } from 'react';
import ReactDom from 'react-dom';
class GirdRenderColumnComponent extends Component<any, any> {
  render() {
    const { value, rowIndex, render, data, valueFormatted, context } = this.props;
    const showValue = valueFormatted && !Array.isArray(value) ? valueFormatted : value;
    return (
      <>{typeof render == 'function' ? render(showValue, data, rowIndex, this.props) : showValue}</>
    );
  }
}
export default function GirdRenderColumn(): any {

}
// init method gets the details of the cell to be renderer
GirdRenderColumn.prototype.init = function(params) {
  this.eGui = document.createElement('div');
  ReactDom.render(<GirdRenderColumnComponent {...params} />, this.eGui);
};
GirdRenderColumn.prototype.getGui = function() {
  return this.eGui;
};