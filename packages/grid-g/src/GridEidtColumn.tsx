import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { RowNode } from 'ag-grid-community';
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
      valueGetter,
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
      cellEditorPopup,
      node,
    } = props;
    const value = useMemo(() => (initValueFormatter ? initValueFormatter(props) : nodeValue), [
      nodeValue,
    ]);
    const [newValue, setNewValue] = useState(value);
    const divRef = useRef<HTMLDivElement>(null);
    const inputRef: any = useRef();

    const compoentProps = useMemo(() => {
      if (typeof fieldProps === 'function') return fieldProps(node.data, props);
      return fieldProps;
    }, [fieldProps, node.data, props]);

    const handleCellEditingChange = useCallback(
      async (chageVal, editData, ...ags) => {
        gridManager.loading = true;
        let res = editData;
        if (onCellEditingChange) {
          res = await onCellEditingChange(editData, field, chageVal, value, {
            context: props.context,
            extra: ags,
          });
          res = Array.isArray(res) ? res : [res];
          const resIndex = findIndex(res, function(item) {
            return getRowNodeId(item) === getRowNodeId(data);
          });
          const changeData = get(res, `[${resIndex}]`, {});
          const callValue = get(changeData, `${field}`);
          const editChangeValue = initValueFormatter
            ? initValueFormatter({
                ...props,
                node: { ...node, data: { ...changeData } },
                data: { ...changeData },
                value: callValue,
              })
            : callValue;
          if (!isEqualObj(editChangeValue, chageVal)) setNewValue(editChangeValue);
          if (isEmpty(res)) return console.warn('celleditingChange must be callbak result');
          await gridManager.modify(res);
          typeof onCellChanged == 'function' && onCellChanged(editData, field, chageVal, value);
        }
        gridManager.loading = false;
      },
      [onCellEditingChange, onCellChanged, props.context],
    );

    const onChange = useCallback(
      async (val: any, ...ags) => {
        let chageVal = val;
        let { data } = node;
        data = cloneDeep(data);
        if (typeof changeFormatter === 'function') chageVal = changeFormatter(val, data, ...ags);
        const editData = set(data, field, chageVal);
        setNewValue(chageVal);
        handleCellEditingChange(chageVal, editData, ...ags);
      },
      [changeFormatter, field, node, handleCellEditingChange],
    );

    const handleCellEditChange = useCallback(
      async newValue => {
        let editData = cloneDeep(get(node, `data`));
        const oldData = cloneDeep(data);
        set(editData, `${field}`, newValue);
        gridManager.loading = true;
        if (onCellEditChange) {
          editData = await onCellEditChange(editData, field, newValue, value, {
            context: props.context,
          });
        }
        await gridManager.modify(editData, [oldData]);
        typeof onCellChanged == 'function' && onCellChanged(editData, field, newValue, value);
        gridManager.loading = false;
      },
      [node, field, data, onCellEditChange, props.context],
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
          isCancelBeforeStart() {
            return false;
          },
          getValue: () => {
            let nodeValue = get(node, `data.${field}`);
            nodeValue = valueGetter
              ? valueGetter({ ...props, node: node, data: node.data })
              : nodeValue;
            const value = initValueFormatter
              ? initValueFormatter({
                  ...props,
                  node: node,
                  data: node.data,
                  value: nodeValue,
                })
              : nodeValue;
            if (isEqualObj(value, newValue)) return nodeValue;
            setTimeout(() => {
              handleCellEditChange(newValue);
            }, 1);
            return nodeValue;
          },
          // isCancelAfterEnd:()=>false
        };
      },
      [newValue],
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

    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(event => {
      if (event.key === 'Enter') {
        setTimeout(() => {
          api.stopEditing();
        }, 100);
      }
    }, []);

    return (
      <div onKeyDown={onKeyDown} className={classnames('gant-grid-cell-editing')} ref={divRef}>
        <WrapperComponent
          autoFocus={true}
          wrapperRef={inputRef}
          {...compoentProps}
          {...defalutProps}
          {...wrapperProps}
          onChange={onChange}
          size={size}
          onBlur={onBlur}
          node={node}
        />
      </div>
    );
  });
