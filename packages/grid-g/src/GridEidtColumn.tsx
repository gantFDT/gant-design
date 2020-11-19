import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
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
      value: nodeValue,
      stopEditing,
      api,
      data,
      colDef: { field },
      props: fieldProps,
      changeFormatter,
      initValueFormatter,
      context: {
        size,
        gridManager,
        onCellEditChange,
        onCellEditingChange,
        getRowNodeId,
        onCellChanged,
      },
      refName = 'wrapperRef',
      valuePropName = 'value',
      node,
    } = props;
    const value = useMemo(() => (initValueFormatter ? initValueFormatter(props) : nodeValue), [nodeValue]);
    const [newValue, setNewValue] = useState(value);
    const divRef = useRef<HTMLDivElement>(null);
    const inputRef: any = useRef();
    const compoentProps = useMemo(() => {
      if (typeof fieldProps === 'function') return fieldProps(node.data, props);
      return fieldProps;
    }, [fieldProps, node.data, props]);
    const handleCellEditingChange = useCallback(
      async (chageVal, editData) => {
        gridManager.loading = true;
        let res = editData;
        if (onCellEditingChange) {
          res = await onCellEditingChange(editData, field, chageVal, value);
          res = Array.isArray(res) ? res : [res];
          const resIndex = findIndex(res, function(item) {
            return getRowNodeId(item) === getRowNodeId(data);
          });
          const chageVal2 = get(res, `[${resIndex}].${field}`);
          if (!isEqualObj(chageVal2, chageVal)) setNewValue(chageVal2);
        }
        if (isEmpty(res)) return console.warn('celleditingChange must be callbak result');
        await gridManager.modify(res);
        typeof onCellChanged == 'function' && onCellChanged(editData, field, chageVal, value);
        gridManager.loading = false;
      },
      [onCellEditingChange, onCellChanged],
    );
    const onChange = useCallback(
      async (val: any) => {
        let chageVal = val;
        let { data } = node;
        data = cloneDeep(data);
        if (typeof changeFormatter === 'function') chageVal = changeFormatter(val, data);
        const editData = set(data, field, chageVal);
        setNewValue(chageVal);
        handleCellEditingChange(chageVal, editData);
      },
      [changeFormatter, field, node, handleCellEditingChange],
    );
    const handleCellEditChange = useCallback(
      async newValue => {
        if (isEqualObj(value, newValue)) return;
        const editData = cloneDeep(get(node, `data`));
        set(editData, `${field}`, newValue);
        if (onCellEditChange) {
          gridManager.loading = true;
          const res = await onCellEditChange(editData, field, newValue, value);
          await gridManager.modify(res, [data]);
          typeof onCellChanged == 'function' && onCellChanged(editData, field, newValue, value);
        }
      },
      [node, field, data, onCellEditChange],
    );
    const onBlur = useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        api.stopEditing();
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
            if (!onCellEditChange) return newValue;
            handleCellEditChange(newValue);
            return value;
          },
        };
      },
      [value, newValue, field, node, handleCellEditChange, onCellEditChange],
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
        <WrapperComponent
          autoFocus={true}
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
