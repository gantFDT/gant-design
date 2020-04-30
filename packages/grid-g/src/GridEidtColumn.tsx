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
import { set, cloneDeep, get } from 'lodash';
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

    const compoentProps = useMemo(() => {
      if (typeof fieldProps === 'function') return fieldProps(data);
      return fieldProps;
    }, [fieldProps, data]);
    useImperativeHandle(
      ref,
      () => {
        return {
          getValue: () => {
            let { data } = node;
            data = cloneDeep(data);
            if (get(data, field) === newValue) return newValue;
            editRowDataChanged(set(data, field, newValue), field, newValue, value);
            return value;
          },
        };
      },
      [value, field, newValue, node],
    );
    useEffect(() => {
      setTimeout(() => {
        console.log('inputRef.current', inputRef.current);
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
