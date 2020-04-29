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
import { trackEditValueChange } from './utils';
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
      context: { size, editRowDataChanged },
      refName = 'wrapperRef',
      valuePropName = 'value',
    } = props;
    const [newValue, setNewValue] = useState(value);
    const inputRef: any = useRef();
    const onChange = useCallback(
      val => {
        let chageVal = val;
        if (typeof changeFormatter === 'function') chageVal = changeFormatter(val, data);
        setNewValue(chageVal);
      },
      [changeFormatter],
    );
    const onBlur = useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        stopEditing();
      },
      [stopEditing],
    );
    const rowId = useMemo(() => {
      if (!rowkey) return rowIndex;
      return rowkey(data);
    }, [rowIndex, rowkey, data]);
    const compoentProps = useMemo(() => {
      if (typeof fieldProps === 'function') return fieldProps(data);
      return fieldProps;
    }, [fieldProps, data]);
    useImperativeHandle(
      ref,
      () => {
        return {
          getValue: () => {
            if (value === newValue) return newValue;
            setTimeout(() => {
              const { data } = api.getRowNode(rowId);
              editRowDataChanged({ ...data, [field]: newValue }, field, newValue, value);
            }, 10);
            return value;
          },
        };
      },
      [value, field, newValue, rowId],
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
