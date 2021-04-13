import React, { useCallback, useMemo, useState } from 'react';
import { Checkbox, Row, notification, Tooltip, Popover, Button } from 'antd';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  SortEndHandler,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Icon } from '@data-cell';
import Receiver from '../locale/Receiver';

Icon.updateFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1252237_yp35yr9jf6.js'})

interface RecordProps {
  fieldName: string;
  title: string;
  checked: boolean;
  clickable?: boolean;
  fixed?: 'left' | 'right';
}

interface SortableProps {
  dataSource: RecordProps[];
  onChange: (records: RecordProps[]) => void;
}

function Sortable(props: SortableProps) {
  const { dataSource, onChange } = props;

  if (!dataSource || !dataSource.length) return null;

  const [ leftSpinIdx, rightSpinIdx ] = useMemo(() => {
    return dataSource.reduce((total, dataItem, dataIdx) => {
      if(dataItem.fixed === 'left') {
        total[0] = dataIdx;
      }
      if(dataItem.fixed === 'right' && total[1] === -1) {
        total[1] = dataIdx;
      }
      return total;
    }, [-1, -1])
  }, [dataSource])

  const handlerLock = useCallback((index, fixed) => {
    dataSource[index].fixed = fixed;
    onChange(arrayMove(dataSource, index, fixed === 'left' ? (leftSpinIdx + 1) : (rightSpinIdx === -1 ? -1 : (rightSpinIdx - 1))));
  }, [dataSource, leftSpinIdx, rightSpinIdx]);

  const handlerUnlock = useCallback(index => {
    const oldFixed = dataSource[index].fixed;
    delete dataSource[index].fixed;
    onChange(arrayMove(dataSource, index, oldFixed === 'left' ? leftSpinIdx : (rightSpinIdx === -1 ? -1 : rightSpinIdx)));
  }, [dataSource, leftSpinIdx, rightSpinIdx]);

  const handlerFieldVisible = useCallback((index, event) => {
    dataSource[index].checked = event.target.checked;
    onChange(dataSource);
  }, [dataSource]);

  const DragHandler = SortableHandle(() => <Icon className="dragHandler" type="icon-drag" />);

  const SortableItem = SortableElement(
    ({ dataItem: { title, checked, fixed }, dataIdx}: any) => (
      <Row type="flex" align="middle" justify="space-between" className="tableRow gant-table-config-row">
        <div style={{ flexGrow: 0 }}>
          <Checkbox checked={checked} onChange={handlerFieldVisible.bind(null, dataIdx)} />
        </div>
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ flex: 1 }}>{title}</span>
        </div>
        <Receiver>{
          (locale) => <div style={{ flexGrow: 0, display: 'flex', width: 64, flexDirection: 'row-reverse' }}>
            <DragHandler />
            {
              fixed ? (
                <Tooltip style={{ flex: 0 }} placement="top" title={locale.setNormalColumn}>
                  <div><Icon type="lock" onClick={() => handlerUnlock(dataIdx)} className="disabledIcon" /></div>
                </Tooltip>
              ) : (
                <>
                  <Tooltip style={{ flex: 0 }} placement="top" title={locale.setFixedRightColumn}>
                    <div><Icon style={{transform: 'rotateY(180deg)'}} type="pushpin" onClick={() => handlerLock(dataIdx, 'right')} className="disabledIcon" /></div>
                  </Tooltip>
                  <Tooltip style={{ flex: 0 }} placement="top" title={locale.setFixedLeftColumn}>
                    <div><Icon type="pushpin" onClick={() => handlerLock(dataIdx, 'left')} className="disabledIcon" /></div>
                  </Tooltip>
                </>
              )
            }
          </div>}
        </Receiver>
      </Row>
    ),
  );

  const SortableList = SortableContainer(() => {
    return (
      <div className="sortableList">
        {
          dataSource.map((dataItem, dataIdx) => (
            <SortableItem
              key={dataItem.fieldName}
              index={dataIdx}
              dataIdx={dataIdx}
              dataItem={dataItem}
            />
          ))
        }
      </div>
    );
  });

  // 选择
  const selectedRows = useMemo(() => dataSource.filter(dataItem => dataItem.checked), [dataSource]);
  const indeterminate = useMemo(() => !!selectedRows.length && selectedRows.length < dataSource.length, [selectedRows, dataSource]);
  const checkedAll = useMemo(() => !!selectedRows.length && selectedRows.length === dataSource.length, [selectedRows, dataSource]);

  const onCheckAllChange = useCallback(({target: { checked }}) => {
    dataSource.forEach(dataItem => { dataItem.checked = !!checked });
    onChange(dataSource);
  }, [dataSource]);

  const handlerSortEnd: SortEndHandler = useCallback(({ oldIndex, newIndex }) => {
    const dataItem = dataSource[oldIndex];
    // 移出固定区
    if(newIndex > leftSpinIdx && (rightSpinIdx === -1 || newIndex < rightSpinIdx)) {
      delete dataItem.fixed;
    }
    // 移到左边固定列
    if(newIndex <= leftSpinIdx) {
      dataItem.fixed = 'left';
    }
    // 移到右边固定列
    if(rightSpinIdx !== -1 && newIndex >= rightSpinIdx) {
      dataItem.fixed = 'right';
    }
    onChange(arrayMove(dataSource, oldIndex, newIndex));
  }, [dataSource, leftSpinIdx, rightSpinIdx]);

  return (
    <Receiver>
      {(locale) => <div style={{ paddingBottom: 10 }} className="gant-smart-table-sortable">
        <Row type="flex" align="middle" justify="space-between" className="tableHeader">
          <div style={{ flexGrow: 0 }}>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkedAll}
            />
          </div>
          <div style={{ flexGrow: 1 }}>
            {locale.checkAll}（{`${selectedRows.length}/${dataSource.length}`}）
          </div>
          <div style={{ flexGrow: 0, width: 56 }}></div>
        </Row>
        <div>
          <SortableList
            onSortEnd={handlerSortEnd}
            axis="y"
            helperClass="sortableHelper"
            useDragHandle
          />
        </div>
      </div>}
    </Receiver>
  );
}

export default Sortable;
