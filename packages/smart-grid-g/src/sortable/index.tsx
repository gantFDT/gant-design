import React, { useCallback, useMemo } from 'react';
import { Checkbox, Row, notification, Tooltip } from 'antd';
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
  title: string;
  checked: boolean;
  lock?: boolean;
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

  const fakeDataSource = useMemo(() => {
    const sliceDataSource = (start: number, end?: number) =>
      dataSource.slice(start, end).map((v, i) => ({ ...v, realIndex: start + i }));
    let locks = dataSource.map(v => {
      v.clickable = false;
      v.fixed = undefined;
      return Boolean(v.lock);
    });

    let firstIndex = locks.indexOf(false);
    let lastIndex = locks.lastIndexOf(false);
    if (!~firstIndex) {
      dataSource[0].clickable = true;
      dataSource[dataSource.length - 1].clickable = true;
      return [[], sliceDataSource(0), []];
    }
    if (~firstIndex) {
      dataSource[firstIndex - 1] && (dataSource[firstIndex - 1].clickable = true);
      dataSource[firstIndex].clickable = true;

      for (let idx = 0; idx < firstIndex; idx++) {
        const item = dataSource[idx];
        item.fixed = 'left';
      }
    }
    if (~lastIndex) {
      dataSource[lastIndex].clickable = true;
      dataSource[lastIndex + 1] && (dataSource[lastIndex + 1].clickable = true);

      for (let last = dataSource.length - 1, idx = last; idx > lastIndex; idx--) {
        const item = dataSource[idx];
        item.fixed = 'right';
      }
    }

    let prevDataSource = sliceDataSource(0, firstIndex);
    let unlocakDataSource = sliceDataSource(firstIndex, lastIndex + 1);
    let afterDataSource = sliceDataSource(lastIndex + 1);

    return [prevDataSource, unlocakDataSource, afterDataSource];
  }, [dataSource]);

  const handlerLock = useCallback(
    index => {
      console.log('handlerLock', index)
      if (dataSource[index].clickable) {
        dataSource[index].lock = true;
        onChange(dataSource);
      } else {
        notification.info({
          message: <Receiver>{(locale) => <>{locale.onlySide}</>}</Receiver>,
        });
      }
    },
    [dataSource],
  );

  const handlerUnlock = useCallback(
    index => {
      console.log('handlerUnlock', index)
      if (dataSource[index].clickable) {
        dataSource[index].lock = false;
        onChange(dataSource);
      } else {
        notification.info({
          message: <Receiver>{(locale) => <>{locale.onlyNearUnlock}</>}</Receiver>,
        });
      }
    },
    [dataSource],
  );

  const handlerFieldVisible = useCallback(
    (index, event) => {
      dataSource[index].checked = event.target.checked;
      onChange(dataSource);
    },
    [dataSource],
  );

  const DragHandler = SortableHandle(() => <Icon className="dragHandler" type="icon-drag" />);

  const SortableItem = SortableElement(
    ({ record: { title, checked }, realIndex, lock }: any) => (
      <Row type="flex" align="middle" justify="space-between" className="tableRow gant-table-config-row">
        <div style={{ flexGrow: 0 }}>
          <Checkbox checked={checked} onChange={handlerFieldVisible.bind(null, realIndex)} />
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
          (locale) => <div style={{ flexGrow: 0, display: 'flex', width: 56, flexDirection: 'row-reverse' }}>
            {!lock && <DragHandler />}
            {lock ? (
              <Tooltip style={{ flex: 0 }} placement="top" title={locale.setNormalColumn}>
                <Icon type="lock" onClick={() => handlerUnlock(realIndex)} className="disabledIcon" />
              </Tooltip>
            ) : (
                <Tooltip placement="top" title={locale.setFixedColumn}>
                  <Icon type="unlock" onClick={() => handlerLock(realIndex)} className="disabledIcon" />
                </Tooltip>
              )}
          </div>}
        </Receiver>
      </Row>
    ),
  );

  const SortableList = SortableContainer(() => {
    return (
      <div className="sortableList">
        {fakeDataSource.map((collection, idx) => (
          <React.Fragment key={idx}>
            {collection.map((value: any, index: number) => (
              <SortableItem
                collection={idx}
                disabled={value.lock}
                lock={value.lock}
                index={index}
                key={value.fieldName}
                realIndex={value.realIndex}
                record={value}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  });

  // 选择

  const selectedRows = useMemo(() => dataSource.filter(record => record.checked), [dataSource]);
  const indeterminate = useMemo(
    () => !!selectedRows.length && selectedRows.length < dataSource.length,
    [selectedRows, dataSource],
  );
  const checkedAll = useMemo(
    () => !!selectedRows.length && selectedRows.length === dataSource.length,
    [selectedRows, dataSource],
  );

  const onCheckAllChange = useCallback(
    e => {
      dataSource.forEach(record => {
        record.checked = !!e.target.checked;
      });
      onChange(dataSource);
    },
    [dataSource],
  );

  const handlerSortEnd: SortEndHandler = useCallback(
    ({ oldIndex, newIndex }) => {
      console.log('dataSource',dataSource)
      console.log('oldIndex',oldIndex)
      console.log('newIndex',newIndex)
      const res = arrayMove(dataSource, oldIndex, newIndex)
      console.log('res',res)
      
      // onChange(arrayMove(dataSource, oldIndex, newIndex));
    },
    [dataSource],
  );

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
