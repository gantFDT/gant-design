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
      context: { size, editRowDataChanged, editingRowDataChange },
      refName = 'wrapperRef',
      valuePropName = 'value',
      node,
    } = props;
    const [newValue, setNewValue] = useState(value);
    const divRef = useRef<HTMLDivElement>(null);
    const inputRef: any = useRef();
    const nodeValue = useMemo(() => {
      return get(node.data, field, value);
    }, [node.data]);
    useEffect(() => {
      setNewValue(nodeValue);
    }, [nodeValue]);
    const onChange = useCallback(
      val => {
        let chageVal = val;
        let { data } = node;
        let newData = cloneDeep(data);
        data = cloneDeep(data);
        if (typeof changeFormatter === 'function') chageVal = changeFormatter(val, data);
        set(newData, `${field}`, chageVal);
        node.setData(newData);
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
            if (isEqualObj(value, newValue)) return newValue;
            setTimeout(() => {
              const data = cloneDeep(node.data);
              set(data, field, newValue);
              editRowDataChanged(data, field, newValue, value);
            }, 1);
            return value;
          },
        };
      },
      [value, newValue, field, editRowDataChanged],
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
