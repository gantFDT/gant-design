import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import classnames from 'classnames';
import { EditStatus } from '@data-cell';
import { set, cloneDeep, get, isEmpty } from 'lodash';
import { isEqualObj } from './gridManager/utils';
import { DataActions } from './interface';
import { RowNode } from 'ag-grid-community';
const defalutProps = {
  autoFocus: true,
  edit: EditStatus.EDIT,
};
export default WrapperComponent =>
  forwardRef(function GridEidtColumn(props: any, ref: any) {
    const {
      value,
      stopEditing,
      api,
      data,
      colDef: { field },
      props: fieldProps,
      changeFormatter,
      rowkey,
      rowIndex,
      context: { size, editRowDataChanged, editingRowDataChange },
      refName = 'wrapperRef',
      valuePropName = 'value',
      node,
    } = props;
    const [newValue, setNewValue] = useState(value);
    const inputRef: any = useRef();
    const rowId = useMemo(() => {
      if (!rowkey) return rowIndex;
      return rowkey(data);
    }, [rowIndex, rowkey, data]);
    const onChange = useCallback(
      val => {
        let chageVal = val;
        let { data } = node;
        data = cloneDeep(data);
        if (typeof changeFormatter === 'function') chageVal = changeFormatter(val, data);
        setNewValue(chageVal);
        editingRowDataChange(set(data, field, chageVal), field, chageVal, value);
      },
      [changeFormatter, editingRowDataChange, field, node],
    );
    const onBlur = useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        stopEditing();
      },
      [stopEditing],
    );
    const cellChange = useCallback(
      params => {
        const {
          newValue,
          oldValue,
          column: {
            colDef: { field },
          },
          node,
        } = params;
        console.log('cellChange');
        const data = cloneDeep(node.data);
        editRowDataChanged(data, field, newValue, oldValue);
      },
      [editRowDataChanged],
    );
    useEffect(() => {
      node.addEventListener(RowNode.EVENT_CELL_CHANGED, cellChange);
      return () => {
        node.removeEventListener(RowNode.EVENT_CELL_CHANGED, cellChange);
      };
    }, []);

    const compoentProps = useMemo(() => {
      if (typeof fieldProps === 'function') return fieldProps(data, props);
      return fieldProps;
    }, [fieldProps, data, props]);
    useImperativeHandle(
      ref,
      () => {
        return {
          refresh() {
            return false;
          },
          getValue: () => {
            const { data } = node;
            let { _rowData, _rowType, ...itemData } = cloneDeep(data);
            if (isEmpty(_rowData) || !_rowType) {
              _rowData = isEmpty(_rowData) ? itemData : _rowData;
              _rowType = !_rowType ? DataActions.modify : _rowType;
              node.setData({ ...itemData, _rowData, _rowType });
            }
            return newValue;
          },
        };
      },
      [newValue, value],
    );
    useEffect(() => {
      setTimeout(() => {
        inputRef.current && inputRef.current.focus();
      }, 10);
    }, []);
    const wrapperClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }, []);
    const wrapperProps = useMemo(() => {
      return {
        [refName]: inputRef,
        [valuePropName]: newValue,
      };
    }, [valuePropName, refName, newValue]);
    return (
      <div className={classnames('gant-grid-cell-editing')} onClick={wrapperClick}>
        <WrapperComponent
          wrapperRef={inputRef}
          {...compoentProps}
          {...defalutProps}
          {...wrapperProps}
          onChange={onChange}
          size={size}
          onBlur={onBlur}
        />
      </div>
    );
  });
