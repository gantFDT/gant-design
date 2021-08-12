//自定义列头，主要解决label自主渲染的问题
import { Icon } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default props => {
  const {
    column,
    displayName,
    showColumnMenu,
    setSort,
    enableMenu,
    enableSorting,
    ColumnLabelComponent = null,
  } = props;
  console.log('props', props);
  const sortInfo = props.api.sortController.getSortModel();

  const [ascSort, setAscSort] = useState(false);
  const [descSort, setDescSort] = useState(false);
  const [noSort, setNoSort] = useState(true);
  const [sortIndex, setSortIndex] = useState(undefined);
  const [sortCount, setSortCount] = useState(sortInfo.length);

  const [isFilterActive, setIsFilterActive] = useState(false);

  const refButton = useRef(null);

  const onMenuClicked = () => {
    showColumnMenu(refButton.current);
  };

  const onSortChanged = () => {
    setTimeout(() => {
      setSortIndex(column.sortIndex);
      setSortCount(sortInfo.length);
    });
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
    column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
    column.addEventListener('filterChanged', filterChanged);
  }, []);

  let menu = null;
  if (enableMenu) {
    menu = (
      <div ref={refButton} className="customHeaderMenuButton" onClick={() => onMenuClicked()}>
        <Icon type="menu" />
      </div>
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
        {sortIndex !== undefined && !noSort && <>{sortIndex + 1}</>}
        {/* {sortIndex} */}
        {descSort && <Icon type="arrow-down" />}
        {ascSort && <Icon type="arrow-up" />}
      </div>
    );
  }, [sortIndex, descSort, ascSort, noSort, enableSorting, handleSortChange, sortCount]);

  return (
    <>
      <div className="customHeaderLabel">
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
