import React, { useState, useContext, useCallback, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { EditStatus, SwitchStatus } from '@data-cell';
import { DataContext, RowContext, TableContext } from './context';
import { EditConfig, Record } from './index';
import { getPureRecord } from './_utils';

const invalidateValue = ['', null, undefined];

const getPrefixCls = cls => 'gant-' + cls;

interface BodyCellProps<T> {
  record: T;
  dataIndex: string;
  rowIndex: number;
  editConfig: EditConfig<T>;
  sortable: boolean;
  wrap: boolean;
  light: boolean;
  className: string;
  style: React.CSSProperties;
  [k: string]: any;
}

const BodyCell = <T extends Record = {}>({
  record = {} as T,
  dataIndex = '',
  rowIndex,
  editConfig = {} as EditConfig<T>,
  sortable,
  wrap,
  light,
  children,
  className,
  style,
  ...props
}: BodyCellProps<T>) => {
  const [value, setValue] = useState<string>();
  const [cacheInitialValue, setCacheInitialValue] = useState<string>();
  const [element, setElement] = useState<React.ReactElement>();
  const [edit, setedit] = useState(EditStatus.CANCEL);
  const {
    dataSource,
    setDataSource,
    isTree,
    cellPadding,
    computedRowKey,
    editable,
    originRowHeight,
    originLineHeight,
  } = useContext(DataContext);
  const { dataRowKey, originRecord } = useContext(RowContext);
  const { virtualScroll } = useContext(TableContext);
  const isEdit = useMemo(() => edit === EditStatus.EDIT, [edit]);
  const showDirt = useMemo(() => _.get(editConfig, 'showDirt', true), [editConfig]);
  const isSelection = useMemo(() => className.includes('ant-table-selection-column'), [className]);
  const pureRecord = useMemo(() => getPureRecord(record), [record]);

  const { editValue, render: editRender, clickable = true } = editConfig;

  const getEditValue = useCallback(() => {
    let value: string = _.get(pureRecord, dataIndex);
    if (editValue) {
      if (typeof editValue === 'function') {
        value = editValue(pureRecord, rowIndex, dataIndex);
      } else {
        value = editValue;
      }
    }
    return value;
  }, [pureRecord, originRecord, dataIndex, editValue]);
  const updateElement = useCallback(() => {
    const value = getEditValue();
    setValue(value);
    if (editRender) {
      const element = editRender(value, pureRecord, rowIndex);
      setElement(element);
    }
  }, [pureRecord, rowIndex, editRender]);
  const close = useCallback(() => setedit(EditStatus.CANCEL), []);

  // 设置编辑值的初始值
  useEffect(() => {
    const value = getEditValue();
    setCacheInitialValue(value);
    setValue(value);
  }, []);
  useEffect(() => {
    // fix: 虚拟滚动下不能用value的值
    if (originRecord) {
      setCacheInitialValue(_.get(originRecord, dataIndex));
    }
  }, [originRecord]);

  // 编辑状态改变
  useEffect(() => {
    if (editable === EditStatus.SAVE) {
      // 清除脏标记
      setCacheInitialValue(value);
    } else if (editable === EditStatus.CANCEL && !_.isEqual(cacheInitialValue, value)) {
      // 回退值
      setValue(cacheInitialValue);
      // 曾经编辑过
      // onCancel作为回退值的特定方法，没有的话会调用onChange
      if (element) {
        if (element.props.onCancel) {
          element.props.onCancel(cacheInitialValue);
        } else if (element.props.onChange) {
          element.props.onChange(cacheInitialValue, close, setDataSource);
        }
      }
    }
  }, [editable, value, cacheInitialValue, element]);
  // fix bug 可拖拽排序的课编辑表格，在进入编辑状态的时候会重新排列，因此rowIndex可能会不一样
  // useEffect(() => updateElement(), [rowIndex])

  const onTD = useCallback(
    td => {
      if (td) {
        // 用于拖拽时候的比对
        td.dataIndex = dataIndex;
        td.rowIndex = rowIndex;
      }
    },
    [dataIndex, rowIndex],
  );

  // 切换显示状态
  const switchEdit = useCallback(() => {
    if (editable !== EditStatus.EDIT || !editRender) return false;
    setedit(SwitchStatus(edit));
    return true;
  }, [edit, editable, editRender]);

  const onClick = useCallback(
    e => {
      let switchSuccess = false;
      if (!pureRecord.isDeleted && !isEdit) {
        // 判断钩子
        let allowEdit = clickable;
        if (typeof clickable === 'function') {
          allowEdit = clickable(pureRecord, rowIndex, dataIndex);
        }
        if (allowEdit) {
          switchSuccess = switchEdit(); // 切换编辑状态成功
          if (switchSuccess) updateElement();
        }
      }
      if (props.onClick) {
        props.onClick(e, switchSuccess ? setDataSource : undefined);
      }
    },
    [isEdit, switchEdit, updateElement, props.onClick, pureRecord, clickable, rowIndex, dataIndex],
  );

  const onBlur = useCallback(() => {
    if (element.props.onBlur) {
      // 添加dataSource，保证在不需要切换状态的表格上面可以得到数据，来自行计算
      element.props.onBlur(value, dataSource, setDataSource);
    }
    if (!isTree) {
      setDataSource(([...list]) => {
        list[rowIndex][dataIndex] = value;
        return list;
      });
    } else {
      setDataSource(([...list]) => {
        console.time('更新树耗时');
        const [tree] = getCurrentRecord(list, value);
        console.timeEnd('更新树耗时');
        return tree;
      });
    }
    switchEdit();
  }, [value, element, switchEdit, isTree, dataSource]);

  // 更新树状数据
  const getCurrentRecord = useCallback(
    ([...list], value) => {
      let seted = false;
      let index = 0;
      const item = list[rowIndex];
      // 比如：更新树状table的时候，第一层数据只有2条数据，而更新的数据是下面某一层中的第3条数据
      // 这个时候rowIndex为2，在第一层数据中取不到值，会出现item不存在的情况
      if (item && _.isEqual(computedRowKey(item), dataRowKey)) {
        list[rowIndex][dataIndex] = value;
        seted = true;
      }
      while (!seted && index < list.length) {
        if (_.get(list[index], 'children.length')) {
          const [children, finded] = getCurrentRecord(list[index].children, value);
          seted = finded;
          if (finded) {
            list[index].children = children;
          }
        }
        index++;
      }
      return [list, seted];
    },
    [record, dataIndex, rowIndex, dataRowKey],
  );

  const onChange = useCallback(
    (value, ...args) => {
      setValue(value);
      if (element.props.onChange) {
        element.props.onChange(value, close, setDataSource, ...args);
      }
    },
    [element, dataIndex, rowIndex],
  );

  const renderChildren = useCallback(() => {
    // 在排序表格中，不渲染默认的第一行假数据
    if (sortable) return;
    if (!isEdit) return children;
    if (element) {
      const elementProps = {
        ...element.props,
        value,
        onBlur,
        onChange,
        autoFocus: true,
        allowEdit: false,
        edit: EditStatus.EDIT,
        wrapperClassName: 'table-cell-editing',
      };
      return React.cloneElement(element, elementProps);
    }
  }, [edit, value, element, children, sortable, cellPadding, isEdit]);

  const valueChanged = useMemo(() => {
    if (invalidateValue.includes(value) && invalidateValue.includes(cacheInitialValue))
      return false;
    return !_.isEqual(value, cacheInitialValue);
  }, [value, cacheInitialValue]);

  const renderTd = useCallback(() => {
    const wrapClass =
      virtualScroll || !wrap
        ? [isSelection ? '' : getPrefixCls('table-editcell-ellipsis')]
        : [getPrefixCls('table-editcell-wrap')];
    const computedClassName = classnames(className, wrapClass, {
      [getPrefixCls('table-editcell-dirt')]: showDirt && valueChanged,
    });
    //fix Cannot assign to read only property
    const dStyle = { ...(style || {}) };
    dStyle.padding = cellPadding;
    if (virtualScroll) {
      dStyle.height = originRowHeight;
      if (originLineHeight) {
        // dStyle.lineHeight = originLineHeight
      }
    }
    return (
      <td {...props} style={dStyle} className={computedClassName} onClick={onClick} ref={onTD}>
        {renderChildren()}
      </td>
    );
  }, [
    className,
    cellPadding,
    style,
    wrap,
    showDirt,
    valueChanged,
    element,
    onClick,
    onTD,
    renderChildren,
    isSelection,
    originRowHeight,
    virtualScroll,
    originLineHeight,
  ]);

  return renderTd();
};

export default BodyCell;
