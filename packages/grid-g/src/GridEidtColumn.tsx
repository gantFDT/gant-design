import React, { forwardRef, useImperativeHandle, useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { RowNode } from '@ag-grid-community/core';
import classnames from 'classnames';
import { EditStatus } from '@data-cell';
import { set, cloneDeep, get, isEmpty, debounce, findIndex } from 'lodash';
import { isEqualObj } from './gridManager/utils';
import { stopPropagationForAgGrid } from './utils';
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
      context: { size, editRowDataChanged, gridManager, editingRowDataChange, watchEditChange, onCellEditChange, onCellEditingChange, getRowNodeId },
      refName = 'wrapperRef',
      valuePropName = 'value',
      node,
    } = props;
    const [newValue, setNewValue] = useState(value);
    const divRef = useRef<HTMLDivElement>(null);
    const inputRef: any = useRef();
    const compoentProps = useMemo(() => {
      if (typeof fieldProps === 'function') return fieldProps(node.data, props);
      return fieldProps;
    }, [fieldProps, node.data, props]);
    const onChange = useCallback(
      async (val: any) => {
        let chageVal = val;
        let { data } = node;
        data = cloneDeep(data);
        if (typeof changeFormatter === 'function') chageVal = changeFormatter(val, data);
        const editData = set(data, field, chageVal);
        let res = editData;
        if (onCellEditingChange) {
          res = await onCellEditingChange(editData, field, chageVal, value);
          res = Array.isArray(res) ? res : [res];
          const resIndex = findIndex(res, function(item) {
            return getRowNodeId(item) === getRowNodeId(data);
          });
          chageVal = get(res, `[${resIndex}].${field}`);
        }
        if (isEmpty(res)) return console.warn('celleditingChange must be callbak result');
        setNewValue(chageVal);
        gridManager.modify(res);
      },
      [changeFormatter, editingRowDataChange, field, node, watchEditChange],
    );
    const onCellChanged = useCallback(
      async newValue => {
        const editData = cloneDeep(get(node, `data`));
        set(editData, `${field}`, newValue);
        if (onCellEditChange) {
          const res = await onCellEditChange(editData, field, newValue, value);
          gridManager.modify(res, [data]);
        }
      },
      [node, field, data, onCellEditChange],
    );
    const onBlur = useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        stopEditing();
      },
      [stopEditing],
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          refresh() {
            return false;
          },
          getValue: () => {
            onCellChanged(newValue);
            return newValue;
          },
        };
      },
      [value, newValue, field, node, onCellChanged],
    );
    useEffect(() => {
      setTimeout(() => {
        inputRef.current && inputRef.current.focus();
      }, 10);
    }, []);
    const wrapperClick = useCallback((event: MouseEvent) => {
      stopPropagationForAgGrid(event);
    }, []);
    useEffect(() => {
      divRef.current?.addEventListener('click', wrapperClick);
      return () => {
        divRef.current?.removeEventListener('click', wrapperClick);
      };
    }, []);
    const wrapperProps = useMemo(() => {
      return {
        [refName]: inputRef,
        [valuePropName]: newValue,
      };
    }, [valuePropName, refName, newValue]);
    return (
      <div className={classnames('gant-grid-cell-editing')} ref={divRef}>
        <WrapperComponent wrapperRef={inputRef} {...compoentProps} {...defalutProps} {...wrapperProps} onChange={onChange} size={size} onBlur={onBlur} />
      </div>
    );
  });
