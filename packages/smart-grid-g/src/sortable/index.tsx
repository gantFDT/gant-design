import React, { useCallback, useMemo } from 'react';
import { Checkbox, Row, Tooltip } from 'antd';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  SortEndHandler,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Icon } from '@data-cell';
import Receiver from '../locale/Receiver';

interface RecordProps {
  fieldName: string;
  title: string;
  checked: boolean;
  // clickable?: boolean;
  dynamic?: boolean;
  hide?: boolean;
  display?: string;
  fixed?: 'left' | 'right';
  sort?: 'asc' | 'desc' | 'none';
  sortIndex?: number;
}

interface SortableProps {
  dataSource: RecordProps[];
  onChange: (records: RecordProps[]) => void;
  height?: number;
}

function Sortable(props: SortableProps) {
  const { dataSource, onChange, height } = props;

  if (!dataSource || !dataSource.length) return null;

  const [ leftSpinIdx, rightSpinIdx, selectableCount, checkedCount ] = useMemo(() => {
    return dataSource.reduce((total, dataItem, dataIdx) => {
      if (dataItem.fixed === 'left') {
        total[0] = dataIdx;
      }
      if (dataItem.fixed === 'right' && total[1] === -1) {
        total[1] = dataIdx;
      }
      if (!dataItem.dynamic && !dataItem.hide && dataItem.display === 'block') {
        total[2]++;
        if (dataItem.checked) {
          total[3]++;
        }
      }
      return total;
    }, [-1, -1, 0, 0])
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

  const handleSort = useCallback((index, event) => {
    if (event.shiftKey) {
      const targetRow = dataSource[index];
      targetRow.sort = targetRow.sort === 'asc' ? 'desc' : targetRow.sort === 'desc' ? 'none' : 'asc';
      const sortIndex = dataSource.reduce((memo, row, rowIdx) => row.sortIndex !== undefined && row.sortIndex !== null && rowIdx !== index ? memo + 1 : memo, 0)
      dataSource.forEach((row, rowIdx) => {
        if (rowIdx !== index && row.sortIndex > targetRow.sortIndex) {
          row.sortIndex--;
        }
      })
      if (targetRow.sort === 'none') {
        delete targetRow.sortIndex
      } else {
        targetRow.sortIndex = sortIndex;
      }
    } else {
      dataSource.forEach((row, rowIdx) => {
        if (rowIdx !== index) {
          row.sort = 'none'
          delete row.sortIndex;
        } else {
          row.sort = row.sort === 'asc' ? 'desc' : row.sort === 'desc' ? 'none' : 'asc';
          row.sortIndex = 0;
        }
      })
    }
    onChange(dataSource);
  }, [dataSource]);

  const handlerFieldVisible = useCallback((index, event) => {
    dataSource[index].checked = event.target.checked;
    onChange(dataSource);
  }, [dataSource]);

  const DragHandler = useMemo(() => SortableHandle(() => <Icon className="dragHandler" type="more" />), []);

  const SortableItem = SortableElement(
    ({ dataItem: { title, checked, fixed, sort, sortIndex }, dataIdx}: any) => (
      <Row type="flex" align="middle" justify="space-between" className="tableRow gant-table-config-row">
        <div style={{ flexGrow: 0 }}>
          <Checkbox checked={checked} onChange={handlerFieldVisible.bind(null, dataIdx)} />
        </div>
        <Receiver>
          {(locale) => 
            <>
              <div
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onClick={handleSort.bind(null, dataIdx)}
              >
                <span style={{ display: 'flex', flex: 1, cursor: 'pointer' }}>
                  {title}
                  {
                    sort && sort !== 'none' && <Tooltip
                      style={{ flex: 0 }}
                      placement="top"
                      title={sort === 'asc' ? locale.sortAsc : locale.sortDesc}
                    >
                      <div>{sortIndex !== undefined && sortIndex + 1}<Icon className="gant-margin-h-5" style={{ verticalAlign: 'baseline' }} type={sort === 'asc' ? 'arrow-up' : 'arrow-down'} /></div>
                    </Tooltip>
                  }
                </span>
              </div>
              <div style={{ flexGrow: 0, display: 'flex', width: 64, flexDirection: 'row-reverse' }}>
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
              </div>
            </>
          }
        </Receiver>
      </Row>
    ),
  );

  const SortableList = SortableContainer(() => {
    return (
      <div className="sortableList">
        {
          dataSource.map((dataItem, dataIdx) => (
            dataItem.dynamic || dataItem.display === 'none' || dataItem.hide ? null :
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

  // 选择
  const indeterminate = useMemo(() => checkedCount && checkedCount < selectableCount, [checkedCount, selectableCount]);
  const checkedAll = useMemo(() => checkedCount && checkedCount === selectableCount, [checkedCount, selectableCount]);
  const onCheckAllChange = useCallback(({target: { checked }}) => {
    dataSource.forEach(dataItem => {
      if (dataItem.dynamic || dataItem.hide) {
        dataItem.checked = true
      } else if (dataItem.display !== 'none') {
        dataItem.checked = !!checked
      }
    });
    onChange(dataSource);
  }, [dataSource]);

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
            {locale.checkAll}（{`${checkedCount}/${selectableCount}`}）
          </div>
          <div style={{ flexGrow: 0, width: 56 }}></div>
        </Row>
        <div style={{height: height - 142, overflowY: 'auto', border: '1px solid var(--border-color-split)'}}>
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

export default React.memo(Sortable);
