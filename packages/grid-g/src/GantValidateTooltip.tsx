import classnames from 'classnames';
import { get, isEmpty } from 'lodash';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';

const cellPadding = 11;

const isEmptyObj = value => {
  if (typeof value === 'number') return false;
  if (typeof value === 'object') return isEmpty(value);
  return !value;
};

export default forwardRef((props: any, ref) => {
  const {
    value: _value,
    column,
    context,
    rowIndex,
    colDef: { tooltip, tooltipRender, field },
  } = props;
  const { value, valueFormatted, data, required } = _value;
  const actualColumnWidth = column.actualWidth;

  let overflowText = valueFormatted ? valueFormatted : value;

  //临时div用于获取渲染宽度
  var tempDiv = document.createElement('tempDiv');
  tempDiv.innerHTML = overflowText;
  tempDiv.style.width = 'fit-content';
  tempDiv.style.position = 'fixed';
  tempDiv.style.opacity = '0';
  document.body.appendChild(tempDiv);
  const strWidth = tempDiv.clientWidth;

  useImperativeHandle(ref, () => {
    return {
      getReactContainerClasses() {
        return ['gant-cell-tooltip'];
      },
    };
  });

  useEffect(() => {
    return () => {
      document.body.removeChild(tempDiv);
    };
  }, []);

  if (strWidth + cellPadding < actualColumnWidth) {
    overflowText = null;
  }

  let errorMsg = get(data, `_rowError.${field}`, null);
  errorMsg = isEmptyObj(get(data, `${field}`, null)) && required ? null : errorMsg;
  const ToolTipRender = tooltipRender ? tooltipRender(_value) : null;

  if (overflowText || ToolTipRender || errorMsg) {
    return (
      <div className="gant-cell-tooltip">
        <div
          className={classnames('gant-cell-tooltip-content', errorMsg && 'gant-cell-tooltip-error')}
        >
          {overflowText && overflowText}
          {ToolTipRender && <div>{ToolTipRender}</div>}
          {errorMsg && <div className="gant-cell-tooltip-errorMsg">{errorMsg}</div>}
        </div>
      </div>
    );
  }

  return null;
});
