//自定义列头，主要解决label自主渲染的问题
import { Icon } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { findIndex } from 'lodash';
export default props => {
  const {
    column,
    displayName,
    showColumnMenu,
    setSort,
    enableMenu,
    enableSorting,
    ColumnLabelComponent = null,
    columnApi,
    api,
  } = props;
  const sortInfo = props.api.sortController.getSortModel();
  const [ascSort, setAscSort] = useState(false);
  const [descSort, setDescSort] = useState(false);
  const [noSort, setNoSort] = useState(true);
  const [sortIndex, setSortIndex] = useState(undefined);
  const [sortCount, setSortCount] = useState(sortInfo.length);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [visibleSortNumber, setVisibleSortNumber] = useState(false);

  const refButton = useRef(null);

  const onMenuClicked = () => {
    showColumnMenu(refButton.current);
  };

  useEffect(() => {
    onSortChanged();
  }, []);

  const onSortChanged = () => {
    let stateColumns = columnApi.getColumnState();
    let filterColumns = stateColumns.filter(item => item.sort);
    filterColumns = filterColumns.sort((a, b) => {
      return a.sortIndex - b.sortIndex;
    });
    setVisibleSortNumber(filterColumns.length > 1);
    setSortIndex(findIndex(filterColumns, { colId: column.colId }));
    setSortCount(sortInfo.length);
    setAscSort(column.isSortAscending());
    setDescSort(column.isSortDescending());
    setNoSort(!column.isSortAscending() && !column.isSortDescending());
  };

  const filterChanged = () => {
    setIsFilterActive(column.isFilterActive());
  };

  const onSortRequested = (order, event) => {
    setSort(order, event.shiftKey);
  };

  useEffect(() => {
    api.addEventListener('sortChanged', onSortChanged);
    column.addEventListener('filterChanged', filterChanged);
    return () => {
      api.removeEventListener('sortChanged', onSortChanged);
      column.removeEventListener('filterChanged', filterChanged);
    };
  }, []);

  let menu = null;
  if (enableMenu) {
    menu = (
      <>
        <div ref={refButton} />
        <div className="customHeaderMenuButton" onClick={() => onMenuClicked()}>
          <Icon type="menu" />
        </div>
      </>
    );
  }

  const handleSortChange = useCallback(
    event => {
      if (ascSort) {
        onSortRequested('desc', event);
      }
      if (descSort) {
        onSortRequested('', event);
      }
      if (noSort) {
        onSortRequested('asc', event);
      }
    },
    [ascSort, descSort, noSort],
  );

  const sort = useMemo(() => {
    return (
      <div className="customHeaderSort" onClick={enableSorting ? handleSortChange : () => {}}>
        {visibleSortNumber && sortIndex !== undefined && !noSort && (
          <span style={{ verticalAlign: 'middle' }}>{sortIndex + 1}</span>
        )}
        {/* {sortIndex} */}
        {!noSort && (
          <>
            {descSort && <Icon type="sort-descending" />}
            {ascSort && <Icon type="sort-ascending" />}
          </>
        )}
      </div>
    );
  }, [
    sortIndex,
    descSort,
    ascSort,
    noSort,
    enableSorting,
    handleSortChange,
    sortCount,
    visibleSortNumber,
  ]);

  return (
    <>
      <div className="customHeaderLabel" style={{ marginRight: 5 }}>
        {ColumnLabelComponent ? <ColumnLabelComponent title={displayName} /> : displayName}
      </div>
      {isFilterActive && (
        <div className="customHeaderFilter">
          <Icon type="filter" />
        </div>
      )}
      {sort}
      {menu}
    </>
  );
};
