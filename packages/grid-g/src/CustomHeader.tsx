//自定义列头，主要解决label自主渲染的问题
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Icon } from 'antd';

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
  const [ascSort, setAscSort] = useState(false);
  const [descSort, setDescSort] = useState(false);
  const [noSort, setNoSort] = useState(true);
  const refButton = useRef(null);

  const onMenuClicked = () => {
    showColumnMenu(refButton.current);
  };

  const onSortChanged = () => {
    setAscSort(column.isSortAscending());
    setDescSort(column.isSortDescending());
    setNoSort(!column.isSortAscending() && !column.isSortDescending());
  };

  const onSortRequested = (order, event) => {
    setSort(order, event.shiftKey);
  };

  useEffect(() => {
    column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
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


  const sort = (
    <div className="customHeaderSort" onClick={enableSorting ? handleSortChange : () => {}}>
      {ascSort && <Icon type="arrow-down" />}
      {descSort && <Icon type="arrow-up" />}
    </div>
  );

  return (
    <>
      <div className="customHeaderLabel">
        {ColumnLabelComponent ? <ColumnLabelComponent title={displayName} /> : displayName}
      </div>
      {sort}
      {menu}
    </>
  );
};
