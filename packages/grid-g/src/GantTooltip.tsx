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

function getCellSpace(column) {
  try {
    const {
      paddingLeft,
      paddingRight,
      borderLeftWidth,
      borderRightWidth,
    } = window.getComputedStyle(
      get(column, 'gridOptionsWrapper.eGridDiv').querySelector('.ag-cell'),
    );

    const space =
      parseFloat(paddingLeft) +
      parseFloat(paddingRight) +
      parseFloat(borderLeftWidth) +
      parseFloat(borderRightWidth);

    return space;
  } catch (error) {
    console.error(error);
    return cellPadding;
  }
}

export default forwardRef((props: any, ref) => {
  const {
    value,
    valueFormatted,
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

  if (valueFormatted) {
    renderOverflow = valueFormatted;
  }

  if (render) {
    renderOverflow = !isEmpty(data) && value ? render(value, data, rowIndex, params) : value;
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
    const cellPadding = getCellSpace(column);
    let extraWidth = 0;

    const isTreeRender = get(column, 'colDef.cellRenderer') === 'gantGroupCellRenderer';
    const isRowDrag = (() => {
      let isRowDrag = get(column, 'colDef.rowDrag');
      if (typeof isRowDrag === 'function') {
        return isRowDrag(props);
      }

      return isRowDrag;
    })();

    if (isTreeRender) {
      const level = get(node, 'level');
      extraWidth = 36 + level * 18;
    }

    if (isRowDrag) {
      extraWidth += 28;
    }

    if (width) {
      if (width + cellPadding + extraWidth > actualColumnWidth) {
        setTipShow(true);
      }
    }
  }, []);

  let errorMsg = get(data, `_rowError.${field}`, null);
  // errorMsg = isEmptyObj(get(data, `${field}`, null)) && required ? null : errorMsg;
  errorMsg = undefined;
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
