import classnames from 'classnames';
import { get, isEmpty } from 'lodash';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
const cellPadding = 22;

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

  const containerRef = useRef<any>(null);
  const [showTip, setTipShow] = useState(false);
  const { value, valueFormatted, data, required } = _value;
  const actualColumnWidth = column.actualWidth;

  //获取render内容
  const renderFn = get(props, 'colDef.cellRendererParams.render');
  let overflowText = valueFormatted ? valueFormatted : value;
  const render = renderFn ? renderFn(value, data, rowIndex, props) : overflowText;

  useImperativeHandle(ref, () => {
    return {
      getReactContainerClasses() {
        return ['gant-cell-tooltip'];
      },
    };
  });

  useEffect(() => {
    const width = get(containerRef.current, 'clientWidth');
    if (width) {
      if (width + cellPadding > actualColumnWidth) {
        setTipShow(true);
      }
    }
  }, []);

  let errorMsg = get(data, `_rowError.${field}`, null);
  errorMsg = isEmptyObj(get(data, `${field}`, null)) && required ? null : errorMsg;
  const ToolTipRender = tooltipRender ? tooltipRender(_value) : null;

  if (!showTip && !ToolTipRender && !errorMsg) {
    return (
      <>
        {ReactDOM.createPortal(
          <div
            id="tempDiv"
            ref={containerRef}
            style={{
              width: 'fit-content',
              position: 'fixed',
              opacity: 0,
              whiteSpace: 'pre',
            }}
          >
            {render}
          </div>,
          document.body,
        )}
      </>
    );
  }

  if (render || ToolTipRender || errorMsg) {
    return (
      <div className="gant-cell-tooltip">
        <div
          className={classnames('gant-cell-tooltip-content', errorMsg && 'gant-cell-tooltip-error')}
        >
          {showTip && <>{render}</>}
          {ToolTipRender && <div>{ToolTipRender}</div>}
          {errorMsg && <div className="gant-cell-tooltip-errorMsg">{errorMsg}</div>}
        </div>
      </div>
    );
  }

  return null;
});
