import classnames from 'classnames';
import { get, isEmpty } from 'lodash';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
} from 'react';
import ReactDOM from 'react-dom';
const cellPadding = 22;

const isEmptyObj = value => {
  if (typeof value === 'number') return false;
  if (typeof value === 'object') return isEmpty(value);
  return !value;
};

export default forwardRef((props: any, ref) => {
  const {
    value,
    column,
    context,
    rowIndex,
    colDef: { tooltip, tooltipRender, field },
    context: { requireds },
    columnApi,
    api,
  } = props;

  const required = useMemo(() => {
    return requireds.indexOf(field) >= 0;
  }, [requireds, field]);
  const node = api?.getDisplayedRowAtIndex(rowIndex);
  const data = get(node, 'data', {});
  const params = { ...props, node, data };
  const containerRef = useRef<any>(null);
  const [showTip, setTipShow] = useState(false);
  const actualColumnWidth = get(columnApi.getColumn(field), 'actualWidth', 0);
  //获取要显示的内容内容
  let renderOverflow = String(value);
  const render = get(props, 'colDef.cellRendererParams.render');

  if (render) {
    renderOverflow = render(value, data, rowIndex, params);
  }

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
  const ToolTipRender = tooltipRender ? tooltipRender(params) : null;
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
            {renderOverflow && renderOverflow}
          </div>,
          document.body,
        )}
      </>
    );
  }

  if (renderOverflow || ToolTipRender || errorMsg) {
    return (
      <div className="gant-cell-tooltip">
        <div
          className={classnames('gant-cell-tooltip-content', errorMsg && 'gant-cell-tooltip-error')}
        >
          {showTip && renderOverflow && <>{renderOverflow}</>}
          {ToolTipRender && <div>{ToolTipRender}</div>}
          {errorMsg && <div className="gant-cell-tooltip-errorMsg">{errorMsg}</div>}
        </div>
      </div>
    );
  }

  return null;
});
